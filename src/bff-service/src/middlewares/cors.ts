import { NextFunction, Request, Response } from 'express';

const cors = () => (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

export { cors };
