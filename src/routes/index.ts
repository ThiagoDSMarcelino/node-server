import ClientRoute from './ClientRoute';
import express, { Router } from 'express';

const router = Router();

router.use(express.json());

router.use('/api', ClientRoute);

export default router;
