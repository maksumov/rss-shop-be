/**
 * Load Config from .env file
 */
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });

/**
 * Define Object to store list of Proxied Services
 */
const services: { [key: string]: string } = {};

/**
 * proxiedServices is a comma-separated list of services to proxy
 */
const proxiedServices = process.env?.PROXIED_SERVICES;

if (proxiedServices) {
  proxiedServices
    .split(',')
    .forEach((key) => (services[key] = <string>process.env[key]));
} else {
  console.log(`Error: PROXIED_SERVICES is absent`);
  process.exit(-1);
}

export { services };
