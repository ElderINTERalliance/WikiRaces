const leaderboardAPI = require("../src/game/leaderboardAPI");

describe("leaderboardAPI", () => {
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
		expect(leaderboardAPI.getDateDeltas(start, end)).toBe(largeNumber);
	});
});
