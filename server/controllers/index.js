import { Router } from 'express';
import JWT from 'express-jwt';
import { secret } from '../config';
import { login } from './login';
import { publish, download } from './share';
import { shazam } from './shazam';
import { list } from './files';

export function publicRoutes() {
  const router = Router();
  router.get('/login', login);
  router.get('/health', (req, res) => res.status(200).send('ok'));
  router.post('/publish', publish);
  router.post('/download', download);
  router.post('/shazam', shazam);
  router.get('/list', list);
  return router;
}

export function userRoutes() {
  const router = Router();
  router.use(JWT({ secret }));
  return router;
}
