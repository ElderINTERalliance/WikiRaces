// The purpose of this program is to keep metadata about the system
// with a limit on memory usage.
class Average {
	constructor() {
		this.records = [];
		this.position = 0;
		this.limit = 50;
	}
	async add(data) {
		if (this.position >= this.limit - 1) {
			this.position = 0;
		} else {
			this.position += 1;
		}
		if (this.records[this.position] || this.records[this.position] === 0) {
			this.records[this.position] = data;
		} else {
			this.records.push(data);
		}
	}
	get() {
		return this.records;
	}
	async average() {
		// sum / number of numbers
		const rawAverage =
			this.records.reduce((a, b) => a + b, 0) / this.records.length;
		return Number(rawAverage.toFixed(4));
	}
}

module.exports = { Average };
