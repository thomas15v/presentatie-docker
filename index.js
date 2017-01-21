var express = require('express');
var revealRunInTerminal = require('reveal-run-in-terminal');
var staticFile = require('connect-static-file');
var app = express();

app.use(revealRunInTerminal({'allowRemote': true}));
app.use('/', express.static('node_modules/reveal.js'));
app.use('/static', express.static('node_modules/typed.js'));
app.use('/static/js', express.static('node_modules/jquery/dist'));
app.use('/static/js', express.static('node_modules/headjs/dist/1.0.0'));
app.use('/static/css/highlight', express.static('node_modules/highlight.js/styles'))

app.listen(8080, function () {
    console.log("server started on port 8080")
});