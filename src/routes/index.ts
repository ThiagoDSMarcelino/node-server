import UserRoute from './UserRoute';
import express, { Router } from 'express';
import HotelRoute from './HotelRoute';

const router = Router();

router.use(express.json());

router.use('/user', UserRoute);
router.use('/hotel', HotelRoute);

export default router;
