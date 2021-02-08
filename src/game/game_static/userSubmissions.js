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

/* Start Here: */

(async () => {
	userData = await getUserData();
	setUserName(userData.name);
	setNumCompleted(userData.submissions);
})();
