import express, { Router } from 'express';

import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use(express.json());

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);

export default router;
