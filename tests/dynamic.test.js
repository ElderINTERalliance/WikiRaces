const dynamic = require("../src/game/dynamic");
const path = require("path");
const fs = require("fs");

test("expect cache directory to exist", async () => {
	const cacheFolder = path.join(__dirname, "../src/game/cache");
	expect(fs.existsSync(cacheFolder)).toBeTruthy();
});

test("expect page to load", async () => {
	const page = await dynamic.getPage("Green");
	expect(page).toBeDefined();
});

test("expect page to be cached now", async () => {
	const article = await dynamic.getCached("Green");
	expect(article).toBeDefined();
});

describe("getWiki", () => {
	it("should load a page", async () => {
		const wiki = await dynamic.getWiki("Green");
		expect(wiki).toBeDefined();
		expect(wiki.length).toBeGreaterThan(500);
	});

	it("should not load pages that don't exist", async () => {
		const wiki = await dynamic.getWiki("aslkdjaslkd");
		expect(wiki).toBeUndefined();
	});
});
