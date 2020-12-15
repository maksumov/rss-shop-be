import { AxiosResponse, Method } from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { memoize } from '../common/cache';
import { services } from '../common/config';
import { request } from '../common/request';

const interceptor = Router();
const cachableRequest = memoize(request);

interceptor.all(
  '*',
  async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl, body, method } = req;
    console.log({ originalUrl, body, method });

    /**
     * Parse originalUrl to find appropriate service Proxied Services List
     */
    const urlSplitted = originalUrl.split('/');
    const service = services[urlSplitted[1]];
    const serviceUrl = urlSplitted.slice(2).join('/');

    /**
     * Return 502 if no such service proxied service
     */
    if (!service) {
      res.status(502).json({ error: 'Cannot process request' });
      return;
    }

    const requestUrl = `${service}/${serviceUrl}`;

    try {
      let response: AxiosResponse;

      if (method === 'GET') {
        response = await cachableRequest(requestUrl);
      } else {
        response = await request(requestUrl, <Method>method, body);
      }

      // console.log(response);
      res.status(response.status).json(response.data);
    } catch (e) {
      const { headers, status, statusText, config } = e.response;
      console.log('Axios request error:', status, statusText, headers, config);
      res.status(status).json({ error: statusText });
    }
  }
);

export { interceptor };
