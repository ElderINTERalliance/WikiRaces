/*
 * This file renders the information from the leaderboards api.
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
async function getLeaderboardsData() {
	const levelsURL = generateURL("/wiki-races/api/leaderboards");
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
	time.className = "align-right";

	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);

	for (levelName of levelNames) {
		let level = document.createElement("th");
		level.textContent = levelName.toString();
		level.className = "align-right";
		element.appendChild(level);
	}

	return element;
}

async function setTable(data) {
	let table = document.getElementById("levels-table");
	document.createElement("");
	table.textContent += "testing";
}

/* This is run at script load: */
(async () => {
	const levelNames = await getLevelNames();
	const data = await getLeaderboardsData();
	const sorted = await sortSubmissions([...data]);
	let levelsDiv = document.getElementById("levels-table");
	let table = document.createElement("table");
	table.append(createTableHeading(levelNames));
	console.log(levelNames);
	// setTable(sorted);
	levelsDiv.append(table);
})();
