const stats = require("../src/game/stats");

test("expect average of one value to be that one value", async () => {
	const avg = new stats.Average();
	const LIMIT = avg.limit;
	expect(avg).toEqual({ records: [], position: 0, limit: LIMIT });
});

test("expect add to add one element and increase position", async () => {
	const avg = new stats.Average();
	const LIMIT = avg.limit;
	avg.add(5);
	expect(avg).toEqual({ records: [5], position: 1, limit: LIMIT });
});

test("expect add to wrap around bounds", async () => {
	const avg = new stats.Average();
	const LIMIT = avg.limit;
	for (let i = 0; i < LIMIT; i++) {
		avg.add(i);
	}
	let arr = [];
	for (let i = 0; i < LIMIT - 1; i++) {
		arr.push(i);
	}
	arr[0] = LIMIT - 1;
	expect(avg.records).toEqual(arr);
	expect(avg.position).toEqual(0);
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

test("get records properly", async () => {
	const avg = new stats.Average();
	let arr = [];
	for (let i = 0; i <= 15; i++) {
		avg.add(i);
		arr.push(i);
	}
	expect(avg.get()).toEqual(arr);
});
