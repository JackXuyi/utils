const path = require("path");
const chalk = require("chalk");
const fs = require("fs");

function resolveRootPath(...filePath) {
  return path.resolve(__dirname, "../", ...filePath);
}

function logger(...args) {
  console.log(chalk.gray(...args));
}

function info(...args) {
  console.log(chalk.green(...args));
}

function error(...args) {
  console.log(chalk.red(...args));
}

function warn(...args) {
  console.log(chalk.yellow(...args));
}

function getName(filename) {
  if (!filename || typeof filename !== "string") {
    return "";
  }
  let arr = [];
  if (filename.indexOf("/") > -1) {
    arr = filename.split("/");
  } else {
    arr = filename.split("\\");
  }
  arr.filter((str) => str.trim());
  if (!arr.length || !arr[0]) {
    return "";
  }
  return filename.split(".")[0];
}

function getDirMap(dir) {
  const list = fs.readdirSync(dir);
  const map = {};
  list.forEach(function (file) {
    const tempPath = path.resolve(dir, file);
    map[getName(file)] = tempPath;
  });
  return map;
}

module.exports = {
  resolveRootPath,
  logger,
  info,
  error,
  warn,
  getDirMap,
};
