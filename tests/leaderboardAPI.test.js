const leaderboardAPI = require("../src/game/leaderboardAPI");

describe("leaderboardAPI helper functions", () => {
	it("should have 'level1' in level data.", async () => {
		const levels = await leaderboardAPI.getLevelData();

		expect(levels["level1"]).toBeDefined();
		expect(levels["level1"]["name"]).toEqual("level1");
	});

	it("should be able to get a list of levels.", async () => {
		const levelNames = await leaderboardAPI.getLevelNames();
		expect(levelNames[0]).toEqual("level1");
	});

	it("should subtract dates correctly", async () => {
		const largeNumber = 1000000000000;
		const start = new Date(0);
		const end = new Date(largeNumber);
		expect(await leaderboardAPI.getDateDeltas(start, end)).toBe(
			largeNumber
		);
	});

	it("should get time change from objects with times", async () => {
		const largeNumber = 1000000000000;
		const start = new Date(0);
		const end = new Date(largeNumber);

		const levelObject = {
			levelOpen: start,
			submitTime: end,
		};

		expect(await leaderboardAPI.parseTime(levelObject)).toBe(largeNumber);
	});

	it("should not get time change from objects without times", async () => {
		const levelObject = {
			levelName: "level1",
		};

		expect(await leaderboardAPI.parseTime(levelObject)).not.toBeDefined();
	});

	it("should fill in missing data", async () => {
		let totalTime = 0,
			times = {};
		[totalTime, times] = await leaderboardAPI.fillInMissing(
			totalTime,
			times
		);
		expect(totalTime).not.toBe(0);
		expect(times).not.toBe({});
	});
});

describe("getUserTimes()", () => {
	it("should be able to get User Ids", async () => {
		let userIds = await leaderboardAPI.getUserIds();
		expect(userIds).toBeDefined();
		expect(userIds.length).toBeGreaterThan(0);
	});

	it("should return times and total time", async () => {
		let userIds = await leaderboardAPI.getUserIds();
		let totalTime = 0,
			sortedTimes = {};
		[totalTime, sortedTimes] = await leaderboardAPI.getUserTimes(
			userIds[0]
		);
		expect(totalTime).not.toBe(0);
		expect(sortedTimes).not.toBe({});
	});
});
