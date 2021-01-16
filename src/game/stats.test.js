const stats = require("./stats");

test("expect average of one value to be that one value", () => {
	const avg = new stats.Average();
	expect(avg).toEqual({ records: [], position: 0, limit: 50 });
});

test("expect add to add one element and increase position", () => {
	const avg = new stats.Average();
	avg.add(5);
	expect(avg).toEqual({ records: [5], position: 1, limit: 50 });
});

test("expect add to wrap around limit", () => {
	const avg = new stats.Average();
	for (let i = 0; i <= 30; i++) {
		avg.add(i);
	}
	expect(avg.records).toEqual([
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
		26,
		27,
		28,
		29,
		30,
	]);
	expect(avg.position).toEqual(31);
});

test("expect average of 0 and 10 to be 5", async () => {
	const avg = new stats.Average();
	avg.add(0);
	avg.add(10);
	expect(await avg.average()).toBe(5);
});

test("expect average of 0 through 15 to be 5", async () => {
	const avg = new stats.Average();
	for (let i = 0; i <= 15; i++) {
		avg.add(i);
	}
	expect(await avg.average()).toBe(7.5);
});
