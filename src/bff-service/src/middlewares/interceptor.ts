import { NextFunction, Request, Response, Router } from 'express';
// import {recipients} from '../common/config'

const interceptor = Router();

interceptor.use('*', (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;
  const body = req.body;
  const headers = req.headers;
  const query = req.query;

  console.log('url.split', url.split('/'));
  // if(url.)

  console.log({ url, body, headers, query });
  // res.json({ url, body, headers, query });
  const splitted = url.split('/');
  res.json({ splitted });
});

export { interceptor };
