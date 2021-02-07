const leaderboardAPI = require("../src/game/leaderboardAPI");

test("expect level data to have 'level1'", async () => {
	const levels = leaderboardAPI.getLevelData();

	expect(levels["level1"]).toBeDefined();
	expect(levels["level1"]["name"]).toEqual("level1");
});
