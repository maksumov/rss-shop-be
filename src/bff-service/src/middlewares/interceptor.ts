import { Method } from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { services } from '../common/config';
import { request } from '../common/request';

const interceptor = Router();

interceptor.all(
  '*',
  async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl, body, method } = req;

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

    request(`${service}/${serviceUrl}`, <Method>method, body)
      .then((response) => {
        console.log(response);
        res.status(response.status).json(response.data);
      })
      .catch((e) => {
        const { headers, status, statusText, config } = e.response;
        console.log(
          'Axios request error:',
          status,
          statusText,
          headers,
          config
        );
        res.status(status).json({ error: statusText });
      });
  }
);

export { interceptor };
