import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { isEmpty } from './isempty';

const request = (
  url: string,
  method: Method = 'GET',
  postData: any = {}
): AxiosPromise =>
  new Promise(async (resolve, reject) => {
    try {
      const options: AxiosRequestConfig = {
        method,
        url
      };

      if (method in ['POST', 'PUT', 'DELETE', 'PATCH'] && !isEmpty(postData)) {
        options.data = postData;
      }

      const response = await axios(options);
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });

export { request };
