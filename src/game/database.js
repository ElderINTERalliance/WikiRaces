/* This file contains the class that I use to act as an in memory database.
   Originally, I wanted to use mongodb, because my friends had given it good reviews.
   However, I don't really need a database to persist data after reboots, so I

   app is small enough that it isn't really worth setting up a full database,
   as all I need is a place to store memory for a little while, and then I can get rid of it.
   (or just export it to a JSON file, if I want to keep it.)
 */

// mongoclient, to connect to mongodb
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// bunyan, for logging
const bunyan = require("bunyan");
const bunyanOpts = {
	name: "database",
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

class Database {
	// not sure if this is a bad way to do this.
	async saveUser(name, userId, timeCreated) {
		MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
			if (err) throw err;
			var dbo = db.db("wikiRaces");

			dbo.collection("users").insertOne(
				{
					name: name,
					userId: userId,
					time: timeCreated,
					originalName: name,
				},
				(err, res) => {
					if (err) throw err;
					db.close();
				}
			);
		});
	}
	async saveSubmission(submissionData) {
		MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
			if (err) throw err;
			var dbo = db.db("wikiRaces");

			dbo.collection("submissions").insertOne(
				submissionData,
				(err, res) => {
					if (err) throw err;
					log.info(`Received a submission`);
					db.close();
				}
			);
		});
	}
	async getSubmissions(levelNames) {
		return this.getCollection({}, "submissions");
	}
	async getCollection(query, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{ useUnifiedTopology: true },
				(err, db) => {
					if (err) reject(err);
					var dbo = db.db("wikiRaces");

					dbo.collection(collectionName)
						.find(query)
						.toArray((err, result) => {
							if (err) reject(err);
							else resolve(result);
							db.close();
						});
				}
			);
		});
	}
}

module.exports = { Database };
