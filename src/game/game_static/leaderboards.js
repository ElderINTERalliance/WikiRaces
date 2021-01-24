/*                                                                                                                                                           * This file renders the information from the leaderboards api.
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

/* This is run at script load: */
(async () => {
	const data = await getLeaderboardsData();
	const sorted = await sortSubmissions([...data]);
	console.log(sorted);
})();
