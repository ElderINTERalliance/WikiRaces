/* client.js
 * This is the code that is loaded by `index.html`.
 * It is responsible for holding the wiki page in an iframe,
 * and monitoring the user's progress.
 * It might also submit but idk I haven't go that far.
 */

// I wanted to dynamically load this,
// but just keeping it in the file seems more efficient.
const levels = {
	level1: {
		name: "level1",
		startTime: "2021-01-09T17:50:16.765062",
		endTime: "2021-01-09T17:56:21.830101",
		startPage: "C_(programming_language)",
		endPage: "Sea",
	},
	level2: {
		name: "level2",
		startTime: "2021-01-09T18:25:52.402911",
		endTime: "2021-01-09T18:29:52.402911",
		startPage: "Green",
		endPage: "John_Green_(author)",
	},
};

/* globally accessed variables: */
const settings = getLevelSettings();
const frame = document.getElementById("wikipedia-frame");
var viewedPages = [];
var totalLinks = 0;

// Check if an object has all of the correct
// properties to be a level
function validLevel(level) {
	if (level === undefined) {
		return false;
	}
	if (
		level === levels[level.name] &&
		level.startTime !== undefined &&
		level.endTime !== undefined &&
		level.startPage !== undefined &&
		level.endPage !== undefined
	) {
		return true;
	}
	return false;
}

// Takes a string, returns last `/` to end
function parseLevelFromString(str) {
	const lastSlash = str.lastIndexOf("/") + 1;
	return str.slice(lastSlash);
}

// returns the settings for the level if the URL is valid
// otherwise returns undefined
function getLevelSettings() {
	const levelName = parseLevelFromString(window.location.href);

	if (validLevel(levels[levelName])) {
		return levels[levelName];
	} else {
		return undefined;
	}
}

function goTo(page) {
	frame.src = `/wiki/${page}`;
}

// Sets Iframe location on script load, and when `reset` is clicked
function loadClient() {
	const level = getLevelSettings();
	const frame = document.getElementById("wikipedia-frame");
	const error = document.getElementById("error-text");

	// Set iframe url:
	if (level !== undefined) {
		goTo(level.startPage);
		error.textContent = "";
	} else {
		error.textContent = "Invalid game url.";
	}
	viewedPages = [];

	// Set goal text:
	document.getElementById("goal").textContent = `Goal: ${serialize(
		level.endPage
	)}`;
}

function submit() {
	alert("Everything would have been submitted here.");
}

function serialize(name) {
	return name.replaceAll("_", " ").replaceAll("%27", "'");
}

function unSerialize(name) {
	return name.replaceAll(" ", "_").replaceAll("'", "%27");
}

// creates unordered list from array
function visualizeHistory(array) {
	// Create the list element:
	var list = document.createElement("ul");

	for (var i = 0; i < array.length; i++) {
		// Create the list items:
		var item = document.createElement("li");
		item.className = "history-element";
		// let span = document.createElement("span");
		let border = document.createElement("span");
		border.className = "history-text";
		let text = document.createTextNode(serialize(array[i]));

		// append them
		border.appendChild(text);
		// span.appendChild(border);
		item.appendChild(border);
		list.appendChild(item);
	}

	// Finally, return the constructed list:
	return list;
}

function reverseHistory(goal) {
	let index = viewedPages.indexOf(goal);
	if (index < 0) return undefined;
	viewedPages.splice(index);
	console.log(index);
	goTo(goal);
}

function setHistory() {
	let frame = document.getElementById("history-frame");
	frame.innerHTML = visualizeHistory(viewedPages).innerHTML;
	frame.scrollLeft = 10000;
}

/* Functions that run at script load: */
loadClient();

document.getElementById("restart").addEventListener("click", loadClient);

// TODO - Run on Iframe start to load, not completion.
frame.addEventListener("load", async () => {
	const page = parseLevelFromString(frame.contentWindow.location.href);
	if (page === settings.endPage) {
		submit();
	}
	totalLinks++;
	console.log(page, viewedPages[viewedPages.length - 1]);
	if (page != viewedPages[viewedPages.length - 1]) {
		viewedPages.push(page);
	}
	setHistory();
	document.getElementById("total").textContent = `Total Links: ${totalLinks}`;
	console.log(viewedPages);
});

// navigate to page when history is clicked
document.getElementById("history-frame").addEventListener("click", (ele) => {
	classClicked = ele.target.className;
	if (classClicked !== "history-text") {
		return undefined;
	}
	reverseHistory(unSerialize(ele.target.textContent));
});

setHistory();
