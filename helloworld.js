function say(filename, cb) {
  return fs.readFile(filename, function(err, contents){
    if(err){
      cb(err)
    } else {
      setTimeout(function(){
        cb(null, contents)
      },1000)
    }
  });
}

var fs = require("fs");

//in Common.js (js outside the browser)
//module.exports is already a global, accesible object. You can add properties:
module.exports.say = say;
