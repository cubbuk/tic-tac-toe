const path = require("path");
const exec = require('child_process').exec;
var absolutePath = path.resolve(__dirname, "../");
const allCommands = [];
allCommands.push("cd " + absolutePath);
allCommands.push("tar -czvP dist | ssh  20satir.com 'mkdir dist ; cp -R dist/ dist_$(date +%Y%m%d_%H%M%S) && tar -xzvP -C dist --strip-components=1'");
exec(allCommands.join(" && "),
  (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });