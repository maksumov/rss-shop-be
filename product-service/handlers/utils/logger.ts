/**
 * Handler for logging info
 * @param {Object} event - event object
 * @param {String} handler - lambda name
 */
const info = (event, handler: string) : void =>
  console.log(
    `${handler} started with event: ${JSON.stringify(event, null, 2)}`
  );

/**
 * Handler for logging errors
 * @param {Object} error - error object
 * @param {String} msg  - custom error message
 */
const error = (error, msg) =>
  console.error(`${msg}: ${JSON.stringify(error, null, 2)}`);

export default { info, error };
