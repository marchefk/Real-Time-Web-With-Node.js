function handleHTTP(req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-type": "text/plain"
      });

      ASQ(function(done){
        setTimeout(function(){
          done(Math.random());
        }, 1000)
      }).then(function(done, random){
        setTimeout(function(){
          done("Hello world " + random);
        }, 1000)
      }).val(function(msg){
        res.end(msg);
      });
      
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
