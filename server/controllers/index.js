import { Router } from 'express';
import JWT from 'express-jwt';
import { secret } from '../config';
import { publish, download } from './share';
import { shazam } from './shazam';
import { list } from './files';

export function publicRoutes() {
  const router = Router();
  router.get('/health', (req, res) => res.status(200).send('ok'));
  router.post('/publish', publish);
  router.get('/list', list);
  router.post('/download', download);
  router.post('/shazam', shazam);
  return router;
}

export function userRoutes() {
  const router = Router();
  router.use(JWT({ secret }));
  return router;
}
