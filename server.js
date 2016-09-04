var express = require('express'),
    app = express(),
    http = require('http').createServer(app).listen(8080),
    fs = require('fs');

app.use('/assets', express.static('assets'));

app.get("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./assets/index.html', 'utf8', function (err,data) {
        res.end(data);
    });
});

app.get("/number", function(req, res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({number: Math.random()}));
});
