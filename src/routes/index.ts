import ClientRoute from './ClientRoute';
import injectContainer from '../middleware/injectContainer';
import express, { Router } from 'express';
import container from '../container';

const router = Router();

router.use(express.json());

router.use(injectContainer(container));

router.use('/api', ClientRoute);

export default router;
