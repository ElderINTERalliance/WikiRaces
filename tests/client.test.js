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

describe("/wiki-races/game/level1", () => {
	const LEVEL = "level1";
	beforeAll(async () => {
		// load client
		await page.goto(`${URL}/wiki-races/game/${LEVEL}`);
	});

	it("should have a restart button", async () => {
		let button = await page.evaluate(() =>
			document.getElementById("restart")
		);
		expect(button).toBeDefined();

		let buttonText = await page.evaluate(
			() => document.getElementById("restart").textContent
		);
		expect(buttonText).toBe("Restart");
	});

	it("should have only one iframe", async () => {
		let numberOfIframes = await page.evaluate(
			() => document.querySelectorAll("iframe").length
		);
		expect(numberOfIframes).toBe(1);
	});

	it("should have a history element", async () => {
		let history = await page.evaluate(() =>
			document.getElementById("history-frame")
		);
		expect(history).toBeDefined();
	});

	it("should have blank error text", async () => {
		let errorText = await page.evaluate(
			() => document.getElementById("error-text").textContent
		);
		expect(errorText).toEqual("");
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
