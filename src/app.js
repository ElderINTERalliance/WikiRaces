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
const client = require("./game/client/client");

log.info("Server Started");

// Start Server Code: ---------------

// dynamically generate wiki pages
app.get("/wiki/:id", async (req, res) => {
	const start = new Date();

	// get page
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

let clientCount = 1;
app.get("/game/:level", async (req, res) => {
	// Send game client
	const level = await client.loadLevel(req.params.level);
	res.send(level);
	log.warn(`Game client #${clientCount} loaded.`);
	clientCount++;
	// res.sendFile(path.join(__dirname + "/game/index.html"));
});

// You need a level name to play the game.
app.get("/game", function (req, res) {
	res.redirect("/");
});

app.get("/", (req, res) => {
	res.send("This would be the homepage");
});

// Other routes here
app.get("*", (req, res) => {
	res.send("Sorry, this is an invalid URL.");
});

app.listen(3000);
