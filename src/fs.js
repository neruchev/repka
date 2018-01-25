'use strict';

const fs = require('fs');
const path = require('path');


const isWindows = /^win/.test(process.platform);

function pathJoin(paths) {
  return path.join.apply(null, [].concat(paths));
}

function pathResolve(paths) {
  return path.resolve(pathJoin(paths));
}

function isExist(dir) {
  let isSymlink = false;

  try {
    isSymlink = !!fs.readlinkSync(dir, 'utf8');
  } catch (err) { }

  return {
    dir: fs.existsSync(dir),
    repo: fs.existsSync(path.join(dir, '.git')),
    symlink: isSymlink,
  };
}

function readFile(paths) {
  const dir = pathJoin(paths);

  return fs.existsSync(dir)
    ? String(fs.readFileSync(dir, 'utf8'))
    : undefined;
}

function symlink(target, path) {
  fs.symlinkSync(target, path, 'dir');
}

function packageManagerName() {
  const execpath = process.env.npm_execpath;
  const pmType = (execpath && execpath.indexOf('yarn') !== -1)
    ? 'yarn'
    : 'npm';

  return isWindows ? `${pmType}.cmd` : pmType;
}

module.exports = {
  pathJoin: pathJoin,
  pathResolve: pathResolve,
  isWindows: isWindows,
  isExist: isExist,
  readFile: readFile,
  symlink: symlink,
  packageManagerName: packageManagerName,
};
