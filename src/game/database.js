/* This file contains the class that I use to interact with MongoDB.  */

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

// Note that each database object has a separate connection.
// Try not to have too many database objects.
class Database {
	constructor() {
		this.db = new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{ useUnifiedTopology: true },
				(err, db) => {
					if (err) reject(err);
					const dbo = db.db("wikiRaces");
					resolve(dbo);
				}
			);
		});

		this.db.catch((err) => {
			log.error(err);
			throw err;
		});
	}
	async saveUser(name, userId, timeCreated) {
		var dbo = await this.db;

		dbo.collection("users").insertOne(
			{
				name: name,
				userId: userId,
				time: timeCreated,
				originalName: name,
			},
			(err) => {
				if (err) {
					log.error(err);
					throw err;
				}
			}
		);
	}
	async saveSubmission(submissionData) {
		var dbo = await this.db;

		dbo.collection("submissions").insertOne(submissionData, (err) => {
			if (err) throw err;
			log.info(`Received a submission`);
		});
	}
	// gets submissions with a query
	// gets all submissions if no level is provided
	async getSubmissions(query) {
		if (query === undefined) {
			query = {};
		}
		return this.getCollection(query, "submissions");
	}
	async getUsers() {
		return this.getCollection({}, "users");
	}
	async getUserById(id) {
		if (!id) return undefined;
		let user = await this.getCollection({ userId: id }, "users");
		delete user[0]._id;
		return user[0];
	}
	async getCollection(query, collectionName) {
		var dbo = await this.db;
		return new Promise((resolve, reject) => {
			dbo.collection(collectionName)
				.find(query)
				.toArray((err, result) => {
					if (err) reject(err);
					else resolve(result);
				});
		});
	}
}

module.exports = { Database };
