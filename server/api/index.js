import { test } from './test.controller';
import { checkAPI } from '../auth';

const router = require('express').Router();

router.get('/test', checkAPI, test);

export default router;
