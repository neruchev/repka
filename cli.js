#!/usr/bin/env node
'use strict';

const options = require('./src/options');
const production = require('./src/index.production');
const development = require('./src/index.development');


const mode = process.argv[2];

if (mode === '--production') {
  options.repositories.forEach(production);
}

if (mode === '--development') {
  options.repositories.forEach(development);
}
