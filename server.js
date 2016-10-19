var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var http = require("http");
var fs = require('fs');
var url = require('url');
var qString = require('querystring');

app.get('/', function (req, res) {
    res.send("Hello dev, am a local route nobody knows me yet!");
});

app.use("/template",express.static(__dirname + "/template"));

//app.use(express.static(__dirname + '/template'));
//var server = app.listen(port, function () {
//    console.log('node server is just fine! and running on port - ' + port);
//});

http.createServer(function(req,res) {
	//fs.createReadStream('./template/'+"style.css").pipe(res);
    if(req.url != "/favicon.ico") {
		var access = url.parse(req.url);
		var data = qString.parse(access.query);
		var kode = 0;
		var file = "";

		if(access.pathname == "/") {
			kode = 200;
			file = "index.html";
		} else if(access.pathname == "/contact") {
			kode = 200;
			file = "contact.html";
		} else if(access.pathname == "/form") {
			kode = 200;
			file = "form.html";
		} else {
			kode = 404;
			file = "404.html";
		}
		res.writeHead(kode, {"Content-Type" : "text/html"});
		fs.createReadStream('./template/'+file).pipe(res);
	}
	
	
}).listen(port);

console.log("Server is running...");