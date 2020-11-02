/**
 * @param {Number} statusCode - response status code
 * @param {any} body - response body
 * @returns generated response object with CORS headers
 */
export default (statusCode, body) => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  statusCode,
  body,
});
