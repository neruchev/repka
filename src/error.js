'use strict';

module.exports = function e(error) {
  console.error('\x1b[31m%s\x1b[0m', 'error', error);
  process.exit(1);
};
