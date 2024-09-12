#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, "./playtv");

const commands = {
  win32: path.join(mainPath, "./windows.vbs") + " " + soundPath + ".mp3",
  linux: "paplay " + soundPath + ".ogg",
  darwin: "afplay " + soundPath + ".mp3",
};

const main = () => {
  const command = commands[process.platform];

  if (command) {
    return exec(command, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
};

module.exports = main;

if (!module.parent) {
  main();
}
