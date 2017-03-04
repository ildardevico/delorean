import { Router } from 'express';
import { test } from './test.controller';

export function publicRoutes() {
  const router = Router();
  router.get('/test', test);
  router.get('/health', (req, res) => res.status(200).send('ok'));
  return router;
}

export function userRoutes() {
  const router = Router();
  return router;
}
