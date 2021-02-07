/* This script is loaded when a user Id is requested */
document.getElementById("go-home").addEventListener("click", () => {
	window.location.href = `${window.location.protocol}//${window.location.host}`;
});

document.getElementById("go-leaderboard").addEventListener("click", () => {
	window.location.href = `${window.location.protocol}//${window.location.host}/wiki-races/leaderboard`;
});

alert("script loaded!");
