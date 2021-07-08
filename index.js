#! /usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const axios = require('axios');

const baseUrl = 'https://wve2ggwi04.execute-api.us-east-1.amazonaws.com/staging/';
const localizeUrl = baseUrl + 'localize';
const retrieveUrl = baseUrl + 'retrieve';

program
  .command('run <manifest_url>')
  .description('Run the Foundry Magic L18n on the provided manifest URL. Manifest must be publicly accessible.')
  .action(run);

/**
 * Run the localizations.
 *
 * @param {string} manifest
 *   The URL to the manifest URL.
 *
 * @return {Promise<void>}
 */
async function run(manifest) {
  try {
    new URL(manifest);
  } catch (e) {
    console.log(
      chalk.red('Specified manifest URL is not valid')
    );

    return;
  }

  console.log(
    chalk.green('Manifest URL is valid, submitting to the Foundry Magic L18n service...')
  );

  const response = await axios.get(localizeUrl, {
    params: {
      manifest_url: manifest,
    }
  });

  if (response.status !== 200) {
    console.log(
      chalk.red(`There was an issue connecting to the Foundry Magic L18n service: ${response.data}`)
    );

    return;
  }

  console.log(
    chalk.green('Success! Your localization is processing. Your job ID is ')
    + chalk.green.bold(response.data.jobsId)
  );
}

program.parse();
