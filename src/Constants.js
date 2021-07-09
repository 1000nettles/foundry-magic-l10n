'use strict';

/**
 * A class storing all our shared constants.
 */
module.exports = class Constants {
  static get BASE_URL() {
    return 'https://wve2ggwi04.execute-api.us-east-1.amazonaws.com/staging/';
  }

  static get LOCALIZE_URL() {
    return Constants.BASE_URL + 'localize';
  }

  static get RETRIEVE_URL() {
    return Constants.BASE_URL + 'retrieve';
  }

  static get CONF_KEY() {
    return 'jobs';
  }

  static get STATUS_PROCESSING() {
    return 'PROCESSING';
  }

  static get STATUS_FAILED() {
    return 'FAILED';
  }

  static get STATUS_COMPLETE() {
    return 'COMPLETE';
  }
}
