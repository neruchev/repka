'use strict';

const fs = require('./fs');
const error = require('./error');


module.exports = (repository) => {
  console.log(`Checking the existence of the '${repository.devAliase}' repository...`);
  const isExistDev = fs.isExist(repository.devTwd);

  if (!isExistDev.dir) {
    error(`Missing repository '${repository.devAliase}'.
      Please, clone the repository '${repository.devAliase}' to '${repository.devTwd}'.`);
  }

  if (!isExistDev.repo) {
    error(`'${repository.devTwd}': the repository is corrupt.
      Please, delete the '${repository.devAliase}' folder and re-clone repository '${repository.key}'.`);
  }

  console.log(`Checking the existence of the '${repository.key}' symlink...`);
  const isExistTarget = fs.isExist(repository.twd);

  if (isExistTarget.dir && !isExistTarget.symlink) {
    error(`'${repository.twd}': is a folder.
      Please, delete the '${repository.twd}' folder and try again.`);
  }

  if (!isExistTarget.dir) {
    console.log(`Creating a '${repository.twd}' symlink \nto the target directory '${repository.devTwd}'...`);
    fs.symlink(repository.devTwd, repository.twd);
  }
};
