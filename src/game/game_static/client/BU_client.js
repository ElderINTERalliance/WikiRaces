const fs = require("fs").promises;
const path = require("path");

// bunyan, for logging
const bunyan = require("bunyan");
const bunyanOpts = {
	name: "Client",
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

async function getSettings() {
	const file = await fs.readFile(path.join(__dirname, "/levels.json"));
	return JSON.parse(file);
}

// take a level name and return an object
// with specified properties, or undefined
async function parseLevel(name) {
	const data = await getSettings();
	const level = data[name];
	if (
		data[name] !== undefined &&
		level["startTime"] !== undefined &&
		level["endTime"] !== undefined &&
		level["startPage"] !== undefined &&
		level["endPage"] !== undefined
	) {
		return level;
	} else {
		log.error(
			`error parsing ${name} with contents ${JSON.stringify(level)}`
		);
		return undefined;
	}
}

async function generateLevel(levelSettings) {
	return `settings = ${JSON.stringify(levelSettings)}`;
}

async function loadLevel(name) {
	const level = await parseLevel(name);
	if (level === undefined) {
		return `Level '${name}' not found.`;
	}
	return generateLevel(level);
}

module.exports = { loadLevel };
