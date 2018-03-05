function readFile(filename) {
  //create a sequence
  var sq = ASQ();
  //errfcb - error first callback, automatically generated
  fs.readFile(filename, sq.errfcb());

  return sq;
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
