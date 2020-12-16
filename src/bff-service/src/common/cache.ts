import { AxiosPromise, Method } from 'axios';

const CACHE_TIME = 120_000;

const memoize = (fn: (url: string, method: Method) => AxiosPromise) => {
  const cacheStore: { [key: string]: AxiosPromise } = {};

  return (url: string) => {
    if (typeof cacheStore[url] === 'undefined') {
      const result = (cacheStore[url] = fn(url, 'GET'));
      setTimeout(() => delete cacheStore[url], CACHE_TIME);
      console.log(`Request ${url} is handled from service request...`);
      return result;
    }
    console.log(`Request ${url} is handled from cache...`);
    return cacheStore[url];
  };
};

export { memoize };
