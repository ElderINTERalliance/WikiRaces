/* This file contains the class that I use to act as an in memory database.
   Originally, I wanted to use mongodb, because my friends had given it good reviews.
   However, I don't really need a database to persist data after reboots, so I
   started looking at REDIS as an in-memory database. After that I realized that this
   app is small enough that it isn't really worth setting up a full database,
   as all I need is a place to store memory for a little while, and then I can get rid of it.
   (or just export it to a JSON file, if I want to keep it.)
 */

class Database {
	constructor() {
		this.entries = Array();
	}

	async add(object) {
		if (this.validSubmission(object)) {
			this.entries.push(object);
			return true;
		}
		return false;
	}

	async get() {
		return this.entries;
	}

	async validSubmission(level) {
		return level !== undefined;
	}
}

module.exports = { Database };
