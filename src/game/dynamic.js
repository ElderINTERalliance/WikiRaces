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

const htmlTemplate = `
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js">        <![endif]-->

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Interalliance Wiki Races</title>
    <meta name="description"
        content="A website to host challenges where people try to get from one wikipedia page to another, as quick as possible.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="index.css">
</head>

<body>
    <div id="content">This is the content</div>
</body>
`

async function getWiki(id) {
    try {
        const response = await superagent.get(`https://en.wikipedia.org/wiki/${id}`);
        log.info(`recieved ${id}`);
        return response.text;
    } catch (error) {
        log.error(error);
        return undefined;
    }
}

async function generatePage(id) {
    const dom = new JSDOM(htmlTemplate);
    const page = await getWiki(id);
    if (!page) { return "This page does not exist." }
    dom.window.document.getElementById("content").innerHTML = page;
    return dom.serialize();
}

module.exports = {
    generatePage
}