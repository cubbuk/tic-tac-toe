const path = require("path");
const exec = require('child_process').exec;
var absolutePath = path.resolve(__dirname, "../");
const allCommands = [];
/*
 *
 *
 * 1-) cd to the root folder of the app
 * 2-) tar dist folder and pipe the result to the ssh connection
 * 3-) connect to server with ssh
 * 4-) try to create dist and old_dists folder, if not existing they will be created otherwise they will give an error and rest of the script will continue running
 * 5-) cp contents of dist folder to old_dists/dist_$(dateofmoment) folder so if something is wrong somehow you have an backup of the existing config
 * 6-) untar the piped tar content into dist folder, untar only files under the first parent directory --strip-components=1 flag, if it was 2 it will dive 2 level from the root folder
 *
 *
 */
allCommands.push("cd " + absolutePath);
allCommands.push("tar -czvP dist | ssh  20satir.com 'mkdir dist ; mkdir old_dists; cp -R dist/ old_dists/dist_$(date +%Y%m%d_%H%M%S) && tar -xzvP -C dist --strip-components=1'");
exec(allCommands.join(" && "),
  (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });