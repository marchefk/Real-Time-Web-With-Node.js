function printHelp(){
  console.log("2.js (c) Ewa Dziewiatkowska");
  console.log("");
  console.log("--print          print this help");
  console.log("--file={NAME}    read file of {NAME}");
  console.log("");
}

var args = require("minimist")(process.argv.slice(2), { string: "file"});

if(args.help || !args.file){
  printHelp();
  process.exit(1)
}

var hello = require("./helloworld2.js");
hello.say(args.file)
  .val(function(content){
    console.log(content.toString());
  })
  .or(function(err){
    console.log("Error: " + err);
  });
