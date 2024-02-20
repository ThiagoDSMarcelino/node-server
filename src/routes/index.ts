import express, { Router } from 'express';

import UserRoute from './UserRoute';

const router = Router();

router.use(express.json());

router.use('/user', UserRoute);

export default router;
