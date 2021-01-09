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
		startPage: "John_Green_(author)",
		endPage: "Green",
	},
};

/* globally accessed variables: */
const settings = getLevelSettings();
const frame = document.getElementById("wikipedia-frame");
var viewedPages = [""];

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

// Sets Iframe location on script load, and when `reset` is clicked
function load() {
	const level = getLevelSettings();
	const frame = document.getElementById("wikipedia-frame");
	const error = document.getElementById("error-text");
	if (level !== undefined) {
		frame.src = `/wiki/${level.startPage}`;
		error.textContent = "";
	} else {
		error.textContent = "Invalid game url.";
	}
	viewedPages = Array();
}

function submit() {
	alert("Everything would have been submitted here.");
}

/* Functions that run at script load: */
load();

document.getElementById("control-buttons").addEventListener("click", load);

frame.addEventListener("load", () => {
	const page = parseLevelFromString(frame.contentWindow.location.href);
	if (page === settings.endPage) {
		submit();
	}
	viewedPages.push(page);
	console.log(viewedPages);
});
