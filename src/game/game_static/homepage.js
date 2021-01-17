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

	element.appendChild(numbers);
	element.appendChild(links);
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

	links.appendChild(link);
	element.appendChild(numbers);
	element.appendChild(links);
	return element;
}

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
