/*
 * This file renders the information from the leaderboard api.
 */

document.getElementById("go-home").addEventListener("click", () => {
	window.location.href = `${window.location.protocol}//${window.location.host}`;
});

function generateURL(path) {
	return `${window.location.protocol}//${window.location.host}${path}`;
}

async function getTextFrom(url) {
	var resp;
	var xmlHttp;
	resp = "";
	xmlHttp = new XMLHttpRequest();
	if (xmlHttp != null) {
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		resp = xmlHttp.responseText;
	}
	return resp;
}

async function getLevelNames() {
	const levelsURL = generateURL("/wiki-races/levels.json");
	const resp = await getTextFrom(levelsURL);
	return Object.keys(JSON.parse(resp));
}

/* NOTE: This function runs on document load */
async function getLeaderboardData() {
	const levelsURL = generateURL("/wiki-races/api/leaderboard");
	const resp = await getTextFrom(levelsURL);
	return JSON.parse(resp);
}

async function sortSubmissions(submissions) {
	if (submissions.length <= 0) return undefined;
	return submissions.sort((a, b) => {
		return a.totalTime - b.totalTime;
	});
}

function createTableHeading(levelNames) {
	let element = document.createElement("tr");
	let numbers = document.createElement("th");
	numbers.textContent = "#";
	numbers.className = "align-left";
	let links = document.createElement("th");
	links.textContent = "User:";
	links.className = "align-left";

	let time = document.createElement("th");
	time.textContent = "Total:";
	time.className = "align-left";

	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);

	for (levelName of levelNames) {
		let level = document.createElement("th");
		level.textContent = `${levelName}:`;
		level.className = "align-left";
		element.appendChild(level);
	}

	return element;
}

function createCell(content) {
	let cell = document.createElement("td");
	cell.textContent = content.toString();
	// cell.className = "align-left";
	return cell;
}

// format millisecond time
function formatMS(milliseconds) {
	const date = new Date(Number(milliseconds));
	const m = date.getMinutes();
	const s = date.getSeconds();
	const ms = date.getMilliseconds();
	return `${m}:${s}.${ms}`;
}

let number = 0;

function createTableLine(submission) {
	let element = document.createElement("tr");
	number++;
	element.appendChild(createCell(number));
	element.appendChild(createCell(submission.name));
	element.appendChild(createCell(formatMS(submission.totalTime)));

	for (levelTime of Object.values(submission.times)) {
		element.appendChild(createCell(formatMS(levelTime)));
	}

	return element;
}

/* This is run at script load: */
(async () => {
	const levelNames = await getLevelNames();
	const data = await getLeaderboardData();
	const sorted = await sortSubmissions([...data]);
	console.log(sorted);
	let levelsDiv = document.getElementById("levels-table");
	let table = document.createElement("table");
	table.append(createTableHeading(levelNames));

	for (submission of sorted) {
		table.append(createTableLine(submission));
	}

	levelsDiv.append(table);
})();
