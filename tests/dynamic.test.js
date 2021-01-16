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
	const page = await dynamic.getCached("Green");
	expect(page).toBeDefined();
});
