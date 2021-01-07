// superagent to get wikipedia pages
const superagent = require('superagent');

// Bunyan, for logging
const bunyan = require('bunyan');
const bunyanOpts = {
    name: 'DynamicGeneration',
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'info',
            path: '/var/tmp/WikiRaces.json'
        }
    ]
};
const log = bunyan.createLogger(bunyanOpts);

// jsdom to create and modify the page
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// basic html and css
const htmlTemplate = require("./template").htmlTemplate

async function getWiki(id) {
    try {
        const response = await superagent.get(`https://en.wikipedia.org/wiki/${id}`);
        log.info(`recieved ${id}`);
        return response.text;
    } catch (error) {
        log.warn(error);
        return undefined;
    }
}

async function tryRemoveClass(name, dom) {
    const ele = dom.window.document.getElementsByClassName(name)[0];
    if (ele) {
        ele.remove();
    }
}

async function tryRemoveId(id, dom) {
    const ele = dom.window.document.getElementById(id)
    if (ele) {
        ele.remove();
    }
}

async function generatePage(id) {
    const dom = new JSDOM(htmlTemplate);
    const document = dom.window.document
    const page = await getWiki(id);
    if (!page) { return "This page does not exist." }
    let content = dom.window.document.getElementById("content");
    // set page
    content.innerHTML = page;

    tryRemoveId("mw-navigation", dom)
    // tryRemoveId("mw-head", dom)

    tryRemoveId("mw-hidden-catlinks", dom)
    tryRemoveId("footer", dom)
    tryRemoveId("catlinks", dom)
    tryRemoveId("mw-indicator-pp-default", dom)
    tryRemoveId("References", dom)

    tryRemoveClass("authority-control", dom)
    tryRemoveClass("printfooter", dom)
    tryRemoveClass("sistersitebox", dom)

    // Remove references
    const refs = document.getElementsByClassName("reflist")
    if (refs) {
        for (let i = 0; i < refs.length; i++) {
            refs[i].remove()
        }
    }

    // add logo and text to top left of page
    const image = document.createElement("img")
    image.src = "../logo.png"
    image.style.height = "95px"
    const text = document.createElement("h1")
    text.textContent = "Wiki Races 2021"
    text.style.borderBottom = "0"
    text.style.padding = "35px"
    const heading = document.getElementById("mw-head-base")
    heading.style.height = "100px"
    heading.style.display = "flex"
    heading.style.flexDirection = "row"
    heading.append(image)
    heading.append(text)

    return dom.serialize();
}

module.exports = {
    generatePage
}