import { NextFunction, Request, Response, Router } from 'express';
import { services } from '../common/config';

const interceptor = Router();

interceptor.all('*', (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;
  const body = req.body;

  /**
   * Parse originalUrl to find appropriate service Proxied Services List
   */
  const urlSplitted = url.split('/');
  const service = services[urlSplitted[1]];
  const serviceUrl = urlSplitted.slice(2).join('/');

  /**
   * Return 502 if no such service proxied service
   */
  if (!service) {
    res.status(502).json({ error: 'Cannot process request' });
    return;
  }

  console.log({ service, serviceUrl });
  res.json({ service, serviceUrl });
});

export { interceptor };
