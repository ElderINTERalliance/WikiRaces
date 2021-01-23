const { Database } = require("./game/database");
const db = new Database();

async function getLeaderboards() {
	const submissions = await db.getSubmissions();
	return JSON.stringify(submissions);
}

module.exports = { getLeaderboards };
