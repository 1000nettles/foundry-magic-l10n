#! /usr/bin/env node

'use strict';

const { program } = require('commander');
const run = require('./run');
const list = require('./list');

program
  .command('run <manifest_url>')
  .description('Run the Foundry Magic L18n on the provided manifest URL (the `module.json` or `system.json` file.) Manifest must be publicly accessible.')
  .action(run);

program
  .command('list')
  .description('List all of your Foundry Magic L18n Service jobs.')
  .action(list);

program.parse();
