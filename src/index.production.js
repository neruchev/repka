'use strict';

const childProcess = require('child_process');

const fs = require('./fs');
const git = require('./git');
const error = require('./error');
const options = require('./options');


function build(name, dir) {
  console.log(`Installing ${name} dependencies...`);

  childProcess.spawn(
    fs.packageManagerName(),
    ['install', '--frozen-lockfile'],
    {cwd: dir}
  );
};

module.exports = (repository) => {
  const currentBranch = git.getBranchName(options.cwd);
  const targetBranch = currentBranch === repository.branches.master
    ? repository.branches.master
    : repository.branches.development;

  console.log(`Current project branch: '${currentBranch}'`);
  console.log(`Target '${repository.key}' branch: '${targetBranch}'`);
  console.log();

  const isExist = fs.isExist(repository.twd);

  if (!isExist.symlink && isExist.repo) {
    git.fetchRepository(
      repository.key,
      repository.twd,
      targetBranch,
      build
    );
  } else if (!isExist.symlink && !isExist.dir) {
    git.cloneRepository(
      repository.key,
      repository.twd,
      repository.link,
      targetBranch,
      build
    );
  } else {
    error(`'${repository.twd}': the repository is corrupt.
      Please, delete the 'node_modules' folder and reinstall dependencies.`);
  }
};
