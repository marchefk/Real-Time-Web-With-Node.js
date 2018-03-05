function readFile(filename) {
  return ASQ(function(done){
    var stream = fs.createReadStream(filename);
    var contents = "";

//you can create a backup:
    stream.pipe(fs.createWriteStream(filename + ".backup"));

//chunk is a node default buffer size
    stream.on("data", function(chunk){
      contents += chunk;
    });
    stream.on("end", function(){
      done(contents);
    });

  });
}

function delayMsg(done, contents){
  setTimeout(function(){
    done(contents);
  }, 1000);
}

function say(filename){
  return readFile(filename).
  then(delayMsg);
}

var fs = require("fs");
var ASQ = require("asynquence");
//async-contrib doesnt return anything so:
require("asynquence-contrib");

//in Common.js (js outside the browser)
//module.exports is already a global, accesible object. You can add properties:
module.exports.say = say;
