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

function handleIO(socket){
  function disconnect(){
    clearInterval(intv);
    console.log("client disconnected");
  }
  console.log("client connected");
  socket.on("disconnect", disconnect);

  var intv = setInterval(function(){
    socket.emit("hello", Math.random());
  },1000);

}

var host = "localhost";
var port = 8006;

var http = require("http");
var http_server = http.createServer(handleHTTP).listen(port, host);
var ASQ = require("asynquence");
var node_static = require("node-static");
//we want to serve our static files from the directory this program is in:
var static_files = new node_static.Server(__dirname);


var io = require("socket.io").listen(http_server);

// configure socket.io
io.configure(function(){
	io.enable("browser client minification"); // send minified client
	io.enable("browser client etag"); // apply etag caching logic based on version number
	io.set("log level", 1); // reduce logging
	io.set("transports", [
		"websocket",
		"xhr-polling",
		"jsonp-polling"
	]);
});

io.on("connection", handleIO);
