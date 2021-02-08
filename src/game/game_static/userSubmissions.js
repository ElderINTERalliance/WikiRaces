/* This script displays detailed information about a user. */

document.getElementById("go-home").addEventListener("click", () => {
	window.location.href = `${window.location.protocol}//${window.location.host}`;
});

document.getElementById("go-leaderboard").addEventListener("click", () => {
	window.location.href = `${window.location.protocol}//${window.location.host}/wiki-races/leaderboard`;
});

/* Helper functions: */

function generateURL(path) {
	return `${window.location.protocol}//${window.location.host}${path}`;
}

function parseUserIdFromString(str) {
	const lastSlash = str.lastIndexOf("/") + 1;
	return str.slice(lastSlash);
}

function getIdFromUrl() {
	const url = window.location.pathname;
	return parseUserIdFromString(url);
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

async function getUserData() {
	const pageUrl = window.location.pathname;
	const apiUrl = pageUrl.replace("/leaderboard", "/api/leaderboard");
	const resp = await getTextFrom(apiUrl);
	return JSON.parse(resp);
}

async function setUserName(name) {
	const nameField = document.getElementById("display-name");
	nameField.textContent = name;
}

async function setNumCompleted(array) {
	const numberField = document.getElementById("num-of-levels");
	numberField.textContent = `Number of levels completed: ${array.length}`;
}

// gets difference in milliseconds
function getDateDeltas(open, close) {
	const date = new Date(Date.parse(close) - Date.parse(open));
	return date.getTime();
}

function formatMS(milliseconds) {
	const date = new Date(Number(milliseconds));
	const m = date.getMinutes();
	const s = date.getSeconds();
	const ms = date.getMilliseconds();
	const plural = (x) => (x == 1 ? "" : "s");

	return `${m} minute${plural(m)} ${s}.${ms} seconds`;
}

function createHeader(text) {
	const h3 = document.createElement("h3");
	h3.textContent = `${text}:`;
	return h3;
}

function createTextObject(text) {
	const p = document.createElement("p");
	p.textContent = `${text}`;
	return p;
}

function formatLevelStats(submission) {
	const content = document.createElement("div");
	content.className = "submission-content";

	const duration = getDateDeltas(submission.levelOpen, submission.submitTime);
	const durationText = formatMS(duration);

	content.appendChild(createTextObject(durationText));
	content.appendChild(
		createTextObject(`${submission.totalLinks} links visited`)
	);
	return content;
}

async function generateDisplay(submission) {
	const container = document.createElement("div");
	container.className = "submission";

	container.appendChild(createHeader(submission.levelName));
	container.appendChild(formatLevelStats(submission));

	return container;
}

async function setCompletedLevels(submissions) {
	const subContainer = document.getElementById("submissions-container");
	subContainer.innerHTML = "";
	for (submission of submissions) {
		subContainer.append(await generateDisplay(submission));
	}
}

/* Start Here: */

(async () => {
	userData = await getUserData();
	setUserName(userData.name);
	setNumCompleted(userData.submissions);
	setCompletedLevels(userData.submissions);
})();
