'use strict';

const fs = require('./fs');
const error = require('./error');


const cwd = process.cwd();


function readConfig(name, isRequired) {
  const text = fs.readFile([cwd, name]);

  if (!text && isRequired) {
    error(`Missing '${name}' config in the '${cwd}' directory`);
  }

  return JSON.parse(text || '{}');
}

function transformConfig(config) {
  return Object.keys(config).map((key) => {
    const repositoryParam = config[key];

    return Object.assign({}, repositoryParam, {
      key: key,
      twd: fs.pathResolve([cwd, 'node_modules', key]),
      devPath: fs.pathResolve([cwd, repositoryParam.devPath || '']),
      devTwd: fs.pathResolve([
        cwd,
        repositoryParam.devPath || '',
        repositoryParam.devAliase || '',
      ]),
    });
  });
}

const config = Object.assign(
  readConfig('repka.json', true),
  readConfig('repka.local.json', false)
);

module.exports = {
  cwd: cwd,
  repositories: transformConfig(config),
};
