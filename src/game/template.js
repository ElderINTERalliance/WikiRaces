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
    <link rel="stylesheet" href="../wiki.css">
</head>

<body>
    <div id="content">If you're seeing this, something went terribly wrong.</div>
</body>
`;

module.exports = {
	htmlTemplate,
};
