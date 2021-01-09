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
		startTime: "Fri Jan 08 2021 09:32:34 GMT-0500 (Eastern Standard Time)",
		endTime: "Fri Jan 08 2021 10:32:34 GMT-0500 (Eastern Standard Time)",
		startPage: "John_Green_(author)",
		endPage: "Green",
	},
	level2: {
		endPage: "Green",
	},
};

document.getElementById("control-buttons").addEventListener("click", () => {
	document.getElementById("wikipedia-frame").src = "/wiki/Test";
});

document.getElementById("wikipedia-frame").src = "/wiki/Test";
