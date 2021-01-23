// My code to interact with mongodb.
// `db` is not the same as mongodb's `db`
const { Database } = require("./database");
const db = new Database();

// fs and path, to read levels.json
const fs = require("fs").promises;
const path = require("path");

const staticFolder = path.join(__dirname, "/game_static/levels.json");
async function getLevelNames() {
	const file = await fs.readFile(`${staticFolder}`, "utf-8");
	return Object.keys(JSON.parse(file));
}

// Should return object containing:
// username
// userid
// sum time
// level times
async function getUserTimes(userId) {}

async function getLeaderboards() {
	return db.getUserById("1d8f2b5bfa19f0ef3626fe360a81a208f0dda67a");
}

async function getLevelsLeaderboards() {
	const levelNames = await getLevelNames();
	let submissions = new Set();
	for (levelName of levelNames) {
		let arr = await db.getSubmissions({ levelName: levelName });
		for (submission of arr) {
			delete submission._id;
		}
		submissions[levelName] = arr;
	}
	return JSON.stringify(submissions);
}

module.exports = { getLeaderboards };
