async function getJsonData() {
	const levelsURL = `http://${window.location.host}/wiki-races/levels.json`;

	var resp;
	var xmlHttp;

	/* XML Request on main thread is a bad idea. */
	resp = "";
	xmlHttp = new XMLHttpRequest();

	if (xmlHttp != null) {
		xmlHttp.open("GET", levelsURL, false);
		xmlHttp.send(null);
		resp = xmlHttp.responseText;
	}
	return JSON.parse(resp);
}

function createTableHeading() {
	let element = document.createElement("tr");
	let numbers = document.createElement("th");
	numbers.textContent = "#";
	numbers.className = "align-left";
	let links = document.createElement("th");
	links.textContent = "Links:";
	links.className = "align-left";

	let time = document.createElement("th");
	time.textContent = "Time:";
	time.className = "align-left";
	time.className += " time";

	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);
	return element;
}

function nameToURL(name) {
	return `http://${window.location.host}/wiki-races/game/${name}`;
}

function createTableLine(number, content) {
	let element = document.createElement("tr");
	let numbers = document.createElement("td");
	numbers.textContent = number.toString();
	numbers.className = "align-left";

	let links = document.createElement("td");
	let link = document.createElement("a");

	url = nameToURL(content);
	link.href = url;
	link.textContent = url;
	link.className = "align-left";

	let time = document.createElement("td");
	time.className = "align-left";
	time.className += " time";

	links.appendChild(link);
	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);
	return element;
}

function getTime() {
	return new Date();
}

function getSoonestLevel(levels) {
	const levelNames = Object.keys(levels);
	let soonestTime = levels[levelNames[0]].startTime;
	let soonestLevel = undefined;
	for (level of levelNames) {
		let time = levels[level].startTime;
		if (time < soonestTime && time > getTime()) {
			soonestTime = time;
			soonestLevel = level;
		}
	}
	return soonestLevel;
}

// Run at script load:

(async () => {
	const levels = await getJsonData();
	let levelsDiv = document.getElementById("levels-table");
	let table = document.createElement("table");
	table.append(createTableHeading());

	const names = Object.keys(levels);
	for (let i = 0; i < names.length; i++) {
		table.append(createTableLine(i, names[i]));
	}
	levelsDiv.append(table);
})();

(async () => {
	const data = await getJsonData();
	setInterval(() => {
		console.log(getSoonestLevel(data));
	}, 300);
})();
