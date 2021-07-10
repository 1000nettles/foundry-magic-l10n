/**
 * A class storing all our shared constants.
 */
module.exports = class Constants {
  /**
   * The base URL to the service.
   *
   * @return {string}
   */
  static get BASE_URL() {
    return 'https://vtyswuxln2.execute-api.us-east-1.amazonaws.com/prod/';
  }

  /**
   * The URL to the "localize" endpoint, kicking off the jobs.
   *
   * @return {string}
   */
  static get LOCALIZE_URL() {
    return `${Constants.BASE_URL}localize`;
  }

  /**
   * The URL to the "retreieve" endpoint, getting the status of a job and
   * building a zip file if complete.
   *
   * @return {string}
   */
  static get RETRIEVE_URL() {
    return `${Constants.BASE_URL}retrieve`;
  }

  /**
   * The configuration storage key for storing data locally.
   *
   * @return {string}
   */
  static get CONF_KEY() {
    return 'jobs';
  }

  /**
   * The "processing" status for jobs.
   *
   * @return {string}
   */
  static get STATUS_PROCESSING() {
    return 'PROCESSING';
  }

  /**
   * The "failed" status for jobs.
   *
   * @return {string}
   */
  static get STATUS_FAILED() {
    return 'FAILED';
  }

  /**
   * The "complete" status for jobs.
   *
   * @return {string}
   */
  static get STATUS_COMPLETE() {
    return 'COMPLETE';
  }
};
