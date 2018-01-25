'use strict';

const childProcess = require('child_process');
const fs = require('./fs');
const error = require('./error');


function getBranchName(dir) {
  let repoBranch;
  const gitlabCIBranch = process.env.CI_COMMIT_REF_NAME;
  const text = fs.readFile([dir, '.git/HEAD']);

  if (text) {
    const match = /ref: refs\/heads\/([^\n]+)/.exec(text);
    repoBranch = match && match[1];
  }

  if (!repoBranch && !gitlabCIBranch) {
    error('Please, checkout project repository to the existing branch!');
  }

  return repoBranch || gitlabCIBranch;
}

function checkoutBranch(name, dir, branch, cb) {
  console.log(`Checkout ${name} to branch ${branch}...`);

  childProcess.spawn('git', ['checkout', `origin/${branch}`], {cwd: dir})
    .on('close', (status) => {
      if (status !== 0) {
        error(`'git checkout' failed with status ${status}`);
      }
      cb(name, dir);
    });
}

function fetchRepository(name, dir, branch, cb) {
  console.log(`Fetching ${name} repository...`);

  childProcess.spawn('git', ['fetch', 'origin'], {cwd: dir})
    .on('close', (status) => {
      if (status !== 0) {
        error(`'git pull' failed with status ${status}`);
      }
      checkoutBranch(name, dir, branch, cb);
    });
}

function cloneRepository(name, dir, repository, branch, cb) {
  console.log(`Cloning ${name} repository...`);

  childProcess.spawn('git', ['clone', '--branch', branch, '--', repository, dir])
    .on('close', (status) => {
      if (status !== 0) {
        error(`'git clone' failed with status ${status}`);
      }
      cb(name, dir);
    });
}


module.exports = {
  getBranchName: getBranchName,
  checkoutBranch: checkoutBranch,
  fetchRepository: fetchRepository,
  cloneRepository: cloneRepository,
};
