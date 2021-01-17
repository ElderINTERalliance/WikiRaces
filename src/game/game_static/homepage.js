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
	time.textContent = "Starts in:";
	time.className = "align-right";

	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);
	return element;
}

function nameToURL(name) {
	return `http://${window.location.host}/wiki-races/game/${name}`;
}

function getIdFromName(name) {
	return `time-${name}`;
}

function createTableLine(number, content) {
	let element = document.createElement("tr");
	let numbers = document.createElement("td");
	number++;
	numbers.textContent = number.toString();
	numbers.className = "align-left";

	let links = document.createElement("td");
	let link = document.createElement("a");

	url = nameToURL(content);
	link.href = url;
	link.textContent = `Level ${number}`;
	link.className = "align-left";

	let time = document.createElement("td");
	time.className = "align-right";
	time.id = getIdFromName(content);

	links.appendChild(link);
	element.appendChild(numbers);
	element.appendChild(links);
	element.appendChild(time);
	return element;
}

function getTime() {
	return new Date();
}

function getTimeStringAndClass(levelStart, levelEnd) {
	const normal = "align-right";
	const urgent = "align-right status-urgent";
	const over = "align-right status-over";

	if (levelStart === undefined || levelEnd === undefined) return "";
	if (getTime() - levelStart >= 0) {
		if (getTime() - levelEnd >= 0) {
			return ["Complete", over]; // level is completely over
		} else {
			return ["In progress!", urgent];
		}
	}
	const date = getTime();
	let seconds = (levelStart - date) / 1000;
	let minutes = Math.floor(seconds / 60);
	seconds = seconds - minutes * 60;

	// Update time on screen
	if (minutes > 5) {
		return [`${minutes} minutes`, normal];
	} else if (minutes > 0) {
		return [`${minutes} minutes ${Math.round(seconds)} sec`, normal];
	} else {
		return [`${Math.round(seconds)} sec`, urgent];
	}
}

function updateTimes(levels) {
	const names = Object.keys(levels);

	for (level of names) {
		const div = document.getElementById(getIdFromName(level));
		const levelStart = Date.parse(levels[level].startTime);
		const levelEnd = Date.parse(levels[level].endTime);
		const info = getTimeStringAndClass(levelStart, levelEnd);
		const text = info[0];
		const className = info[1];
		div.textContent = text;
		div.className = className;
	}
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
	updateTimes(data);
	setInterval(() => {
		updateTimes(data);
	}, 1000);
})();
