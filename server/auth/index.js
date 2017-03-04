import { Router as createRouter } from 'express';

const Router = createRouter();

Router.route('/register')
  .post((req, res, next) => {
    res.sendStatus(200);
    //or next(err)
  });

export const checkAPI = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: 'Not authorized'
    });
    return;
  }
  next();
};

export default Router;
