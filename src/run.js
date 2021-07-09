'use strict';

const chalk = require('chalk');
const conf = new (require('conf'))();
const axios = require('axios');
const Constants = require('./Constants');

/**
 * The `run` command.
 *
 * Run the localizations on the service.
 *
 * @param {string} manifestUrl
 *   The URL to the manifest.
 *
 * @return {Promise<void>}
 */
module.exports = async (manifestUrl) => {
  if (_checkJobAlreadyRunning()) {
    return;
  }

  try {
    new URL(manifestUrl);
  } catch (e) {
    console.log(
      chalk.red('Specified manifest URL is not valid')
    );

    return;
  }

  console.log(
    chalk.green('Manifest URL is valid, submitting to the Foundry Magic L18n service...')
  );

  const response = await axios.get(Constants.LOCALIZE_URL, {
    params: {
      manifest_url: manifestUrl,
    }
  });

  const jobId = response.data?.jobsId;

  if (response.status !== 200 || !jobId) {
    console.log(
      chalk.red(`There was an issue connecting to the Foundry Magic L18n service: ${response.data}`)
    );

    return;
  }

  // Store our data.
  let jobs = conf.get(Constants.CONF_KEY) || [];
  jobs.push({
    jobId,
    status: Constants.STATUS_PROCESSING,
    started: Date.now(),
  });

  conf.set(Constants.CONF_KEY, jobs);

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

/**
 * Check if a job is already running and if it is, let the user know there
 * can only be one-at-a-time.
 *
 * @return {boolean}
 * @private
 */
function _checkJobAlreadyRunning() {
  let jobs = conf.get(Constants.CONF_KEY) || [];

  for (const job of jobs) {
    if (job.status === Constants.STATUS_PROCESSING) {
      console.log(
        chalk.yellow(
          `You are currently processing another job with ID ${job.jobId}. Please wait until this job is finished before running again.`
        )
      );
      console.log(
        chalk.yellow(`Check up on this job by running `)
        + chalk.cyan('foundry-magic-l18n list')
      );
      return true;
    }
  }

  return false;
}
