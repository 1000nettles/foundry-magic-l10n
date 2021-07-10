#! /usr/bin/env node

const { program } = require('commander');
const run = require('./run');
const list = require('./list');

program
  .command('run <manifest_url>')
  .description('Run the Foundry Magic L10n on the provided manifest URL (the `module.json` or `system.json` file.) Manifest must be publicly accessible.')
  .action(run);

program
  .command('list')
  .description('List all of your Foundry Magic L10n Service jobs.')
  .action(list);

program.parse();
