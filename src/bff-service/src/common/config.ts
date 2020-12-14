/**
 * Load Config from .env file
 */
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });

/**
 * Check if object is empty
 */
const isEmpty = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * Define Object to store list of Proxied Services
 */
const services: { [key: string]: string } = {};

/**
 * proxiedServices is a comma-separated list of services to proxy
 */
const proxiedServices = process.env?.PROXIED_SERVICES;

/**
 * Create a list of Proxied Services from process.env
 */
if (proxiedServices) {
  proxiedServices.split(',').forEach((key) => {
    /**
     * Handle cases if url is undefined
     * (no url for service in process.env is provided)
     */
    const url = <string>process.env[key];
    if (url === undefined) {
      return;
    }
    services[key] = url;
  });
} else {
  /**
   * Handle cases if no PROXIED_SERVICES in process.env is provided
   */
  console.log(`Error: PROXIED_SERVICES is absent`);
  process.exit(-1);
}

/**
 * Handle cases if no config for proxied services
 */
if (isEmpty(services)) {
  console.log(`Error: list of proxied services is empty`);
  process.exit(-2);
}

export { services };
