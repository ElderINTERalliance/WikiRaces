document.getElementsByClassName("control-buttons")[0].addEventListener("click", () => {
	document.getElementsByClassName('wikipedia-frame')[0].src = "https://en.wikipedia.org/wiki/Henry_VIII";
	console.log("restarted");
});

console.log("loaded");

