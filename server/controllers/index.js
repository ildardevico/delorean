import { Router } from 'express';
import JWT from 'express-jwt';
import { secret } from '../config';
import { login } from './login';

export function publicRoutes() {
  const router = Router();
  router.get('/login', login);
  router.get('/health', (req, res) => res.status(200).send('ok'));
  return router;
}

export function userRoutes() {
  const router = Router();
  router.use(JWT({ secret }));
  return router;
}
