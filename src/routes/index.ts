import express, { Router } from 'express';

import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use(express.json());

router.use('/user', UserRoute);
router.use('/auth', AuthRoute);

export default router;
