var express = require('express'),
	app = express(),
	server = require('http').createServer(app);
var port = Number(process.env.PORT || 3000);
server.listen(port);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/form', function (req, res) {
    res.sendFile(__dirname + '/Form.html');
});

app.use(express.static(__dirname));