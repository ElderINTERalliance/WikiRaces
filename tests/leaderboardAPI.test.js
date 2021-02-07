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
});
