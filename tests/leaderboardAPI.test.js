const leaderboardAPI = require("../src/game/leaderboardAPI");

describe("leaderboardAPI", () => {
	it("should have 'level1' in level data.", async () => {
		const levels = await leaderboardAPI.getLevelData();

		expect(levels["level1"]).toBeDefined();
		expect(levels["level1"]["name"]).toEqual("level1");
	});

	it("should be able to get a list of levels.", async () => {
		const levelNames = await leaderboardAPI.getLevelNames();
		expect(levelNames).toEqual(expect.arrayContaining("test1"));
	});
});
