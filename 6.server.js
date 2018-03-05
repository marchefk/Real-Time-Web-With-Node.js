function handleHTTP(req, res) {
  if (req.method === "GET") {
    //the following regex says: if it starts with a slash and has one or more
    //numeric digit and it ends
    //with end of the string or one of URL separator characters:
    if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end",function(){
        //if user asks for /6 change it to /6.html:
				req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
				static_files.serve(req,res);
			});
			req.resume();
		} else {
      res.writeHead(403);
      res.end("Get outta here!");
    }
  } else {
    res.writeHead(403);
    res.end("Get outta here!");
  }
}

function returnRandom() {
  return Math.random();
}

var host = "localhost";
var port = 8006;

var http = require("http");
var http_server = http.createServer(handleHTTP).listen(port, host);
var ASQ = require("asynquence");
var node_static = require("node-static");
//we want to serve our static files from the directory this program is in:
var static_files = new node_static.Server(__dirname);
