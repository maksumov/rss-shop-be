import { NextFunction, Request, Response, Router } from 'express';

const mainpage = Router();

mainpage.use('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.json({
      message: 'Hello!'
    });
  } else next();
});

export { mainpage };
