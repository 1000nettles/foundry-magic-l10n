'use strict';

const chalk = require('chalk');
const axios = require('axios');
const conf = new (require('conf'))();
const Constants = require('./Constants');

/**
 * The `list` command.
 *
 * List any and all jobs executed by the user, and their relevant details.
 *
 * @return {Promise<void>}
 */
module.exports = async () => {
  let jobs = conf.get(Constants.CONF_KEY) || [];

  if (!jobs.length) {
    console.log(
      chalk.green('No jobs found! Localize a module by running: ')
      + chalk.cyan('foundry-magic-l10n run <your_manifest_url_here>')
    );

    return;
  }

  let finalJobs = [];
  let outputData = [];

  for (let job of jobs) {
    if (job.status === Constants.STATUS_PROCESSING) {
      job = await _getJobUpdate(job);
    }

    finalJobs.push(job);

    // Format dates for visual presentation.
    // Clone the job so we don't overwrite its values with visual presentation.
    const jobClone = { ...job };

    jobClone.started = _getFormattedDate(jobClone.started);

    if (jobClone?.completed) {
      jobClone.completed = _getFormattedDate(jobClone.completed);
    }

    outputData.push(jobClone);
  }

  conf.set(Constants.CONF_KEY, finalJobs);

  // Put latest job at the top.
  outputData = outputData.reverse();
  console.log(outputData);
}

/**
 * Reach out to the service to get an update on the job.
 *
 * @param {object} job
 *   The job that we store in our tool.
 *
 * @return {Promise<*>}
 * @private
 */
async function _getJobUpdate(job) {
  if (job.status === Constants.STATUS_COMPLETE || job.status === Constants.STATUS_FAILED) {
    return job;
  }

  const response = await axios.get(Constants.RETRIEVE_URL, {
    params: {
      jobs_id: job.jobId,
    }
  });

  if (response.status !== 200) {
    const error = `There was an issue with the job: ${response.data}`;

    job.status = Constants.STATUS_FAILED;
    job.error = error;
    return job;
  }

  if (response.data?.status === Constants.STATUS_COMPLETE) {
    job.status = Constants.STATUS_COMPLETE;
    job.completed = Date.now();
    job.download = response.data.download;

    return job;
  }

  return job;
}

/**
 * Get a human-readable date from a UNIX timestamp.
 *
 * @param {number} timestamp
 *   The UNIX timestamp provided.
 *
 * @return {string}
 *   The human-readable date.
 *
 * @private
 */
function _getFormattedDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
    + ' '
    + new Date(timestamp).toLocaleTimeString();
}
