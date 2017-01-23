var express = require('express');
var staticFile = require('connect-static-file');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs        = require('fs');
var Mustache  = require('mustache');

app.use('/', express.static('.'));
app.use('/', express.static('node_modules/reveal.js'));
app.use('/static', express.static('node_modules/font-awesome'));
app.use('/static', express.static('node_modules/typed.js'));
app.use('/static/js', express.static('node_modules/jquery/dist'));
app.use('/static/js', express.static('node_modules/headjs/dist/1.0.0'));
app.use('/static/css/highlight', express.static('node_modules/highlight.js/styles'))


io.on( 'connection', function( socket ) {
    socket.on( 'new-subscriber', function( data ) {
        socket.broadcast.emit( 'new-subscriber', data );
    });

    socket.on( 'statechanged', function( data ) {
        delete data.state.overview;
        socket.broadcast.emit( 'statechanged', data );
    });

    socket.on( 'statechanged-speaker', function( data ) {
        delete data.state.overview;
        socket.broadcast.emit( 'statechanged-speaker', data );
    });

});

app.get('/', function( req, res ) {
    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    fs.createReadStream( opts.baseDir + '/index.html' ).pipe( res );
});

app.get( '/notes/:socketId', function( req, res ) {
    fs.readFile('notes.html', function( err, data ) {
        res.send( Mustache.to_html( data.toString(), {
            socketId : req.params.socketId
        }));
    });

});

server.listen(8080, function () {
    console.log("server started on port 8080")
});

