const https = require("https");

const URL = "http://167.172.135.54";

describe("game page", () => {
	beforeAll(async () => {
		await page.goto(`${URL}/wiki-races/game/level1`);
	});

	it('should be titled "Interalliance Wiki Races"', async () => {
		await expect(page.title()).resolves.toMatch("Interalliance Wiki Races");
	});
});

describe("levels.json", () => {
	var data, levels;
	beforeAll(async () => {
		await page.goto(`${URL}/wiki-races/levels.json`);
		data = await page.evaluate(() => document.body.innerText);
		levels = JSON.parse(data);
	});

	it("should load a page", async () => {
		expect(data).toBeDefined();
	});

	it("should have valid names", async () => {
		for (level of Object.keys(levels)) {
			expect(levels[level].name).toBe(level);
		}
	});

	it("should have any start and end times", async () => {
		for (level of Object.keys(levels)) {
			expect(levels[level].startTime).toBeDefined();
			expect(levels[level].endTime).toBeDefined();
		}
	});

	it("should have any start and end pages", async () => {
		for (level of Object.keys(levels)) {
			expect(levels[level].startPage).toBeDefined();
			expect(levels[level].endPage).toBeDefined();
		}
	});
});
