#! /usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const conf = new (require('conf'))();
const axios = require('axios');

const baseUrl = 'https://wve2ggwi04.execute-api.us-east-1.amazonaws.com/staging/';
const localizeUrl = baseUrl + 'localize';
const retrieveUrl = baseUrl + 'retrieve';
const confKey = 'jobs';

const STATUS_FAILED = 'FAILED';
const STATUS_PROCESSING = 'PROCESSING';
const STATUS_COMPLETE = 'COMPLETE';

program
  .command('run <manifest_url>')
  .description('Run the Foundry Magic L18n on the provided manifest URL. Manifest must be publicly accessible.')
  .action(run);

program
  .command('list')
  .description('List all of your Foundry Magic L18n Service jobs')
  .action(list);

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

  if (response.status !== 200 || !response.data?.jobsId) {
    console.log(
      chalk.red(`There was an issue connecting to the Foundry Magic L18n service: ${response.data}`)
    );

    return;
  }

  const jobId = response.data.jobsId;

  // Store our data.
  let jobs = conf.get(confKey) || [];
  jobs.push({
    jobId,
    status: STATUS_PROCESSING,
    started: Date.now(),
  });

  conf.set(confKey, jobs);

  // Tell the user that pushing the job was successful.
  console.log(
    chalk.green('🥳 Success! Your localization is processing. Your job ID is ')
    + chalk.green.bold(jobId)
  );

  console.log(
    chalk.green('Check up on your processing job by running: ')
    + chalk.cyan('foundry-magic-l18n list')
  );

  console.log(
    chalk.green('Once complete, you will find a download URL in the list. This usually takes around 15 - 20 minutes.')
  );
}

async function list() {
  let jobs = conf.get(confKey) || [];

  if (!jobs.length) {
    console.log(
      chalk.green('No jobs found! Localize a module by running: ') + chalk.cyan('foundry-magic-l18n run <your_manifest_url_here>')
    );

    return;
  }

  let finalJobs = [];
  let outputData = [];

  for (let job of jobs) {
    if (job.status === STATUS_PROCESSING) {
      job = await _getJobUpdate(job);
    }

    finalJobs.push(job);

    // Format dates for visual presentation.
    job.started = _getFormattedDate(job.started);

    if (job?.completed) {
      job.completed = _getFormattedDate(job.completed);
    }

    outputData.push(job);
  }

  conf.set(confKey, finalJobs);
  console.log(outputData);
}

async function _getJobUpdate(job) {
  if (job.status === STATUS_COMPLETE || job.status === STATUS_FAILED) {
    return job;
  }

  const response = await axios.get(retrieveUrl, {
    params: {
      jobs_id: job.jobId,
    }
  });

  if (response.status !== 200) {
    const error = `There was an issue with the job: ${response.data}`;

    job.status = STATUS_FAILED;
    job.error = error;
    return job;
  }

  if (response.data?.status === STATUS_COMPLETE) {
    job.download = response.data.download
    job.status = STATUS_COMPLETE;
    job.completed = Date.now();

    return job;
  }

  return job;
}

function _getFormattedDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
    + ' '
    + new Date(timestamp).toLocaleTimeString();
}

program.parse();
