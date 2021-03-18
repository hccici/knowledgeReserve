#!/usr/bin/env node

const { cd, touch } = require('shelljs');

require('shelljs/global');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

cd('./out/Release')
touch('a.txt')