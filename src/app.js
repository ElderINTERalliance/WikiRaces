// Express Js, for Server hosting
const express = require("express");
const app = express();
const path = require("path");

// Bunyan, for logging
const bunyan = require("bunyan");
const bunyanOpts = {
	name: "WikiRaces",
	streams: [
		{
			level: "debug",
			stream: process.stdout,
		},
		{
			level: "info",
			path: "/var/tmp/WikiRaces.json",
		},
	],
};
const log = bunyan.createLogger(bunyanOpts);

// My average library, so I can see how long pages are taking
const stats = require("./game/stats");
const avg = new stats.Average();

// Custom functions for generating Wikipedia pages
const dynamic = require("./game/dynamic");

log.info("Server Started");

// My very small custom "database":
const db = require("./game/database");

// Start Server Code: ---------------

// dynamically generate urls
app.get("/wiki/:id", async (req, res) => {
	const start = new Date();
	const page = await dynamic.getPage(req.params.id);

	res.send(page);

	const end = new Date();
	const seconds = (end.getTime() - start.getTime()) / 1000;
	avg.add(seconds);
	log.info(`Received ${req.params.id} in ${seconds} seconds.`);

	let average = await avg.average();
	if (average >= 0.7) {
		log.warn(`Average time is ${average} seconds.`);
	} else {
		log.info(`Average time is ${average} seconds.`);
	}
});

// include static game files
app.use("/", express.static(__dirname + "/game/game_static"));
app.use("/wiki-races/", express.static(__dirname + "/game/game_static"));

let clientCount = 1;
app.get("/wiki-races/game/*", (req, res) => {
	log.warn(`Game client #${clientCount} loaded.`);
	clientCount++;
	// Send game client
	res.sendFile(path.join(__dirname + "/game/index.html"));
});

// main page
app.get("/wiki-races/", (req, res) => {
	res.sendFile(path.join(__dirname + "/game/homepage.html"));
});

// take user submissions:
app.use(
	express.urlencoded({
		extended: true,
	})
);

// TODO - Add submission form
// app.get("/submit-form/", (req, res) => {
// 	// res.sendFile(path.join(__dirname + "/game/"));
// });

app.post("/submit", (req, res) => {
	log.info(`Received post request: ${req.body.username}`);
	res.end();
});

// Other routes here
app.get("*", (req, res) => {
	res.send(`Sorry, this is an invalid URL. `);
});

app.listen(8443);
