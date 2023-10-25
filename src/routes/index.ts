import ClientRoute from './UserRoute';
import express, { Router } from 'express';

const router = Router();

router.use(express.json());

router.use('/api', ClientRoute);

export default router;
