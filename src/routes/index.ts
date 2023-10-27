import express, { Router } from 'express';

import HotelRoute from './HotelRoute';
import RoomRoute from './RoomRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use(express.json());

router.use('/user', UserRoute);
router.use('/hotel', HotelRoute);
router.use('/room', RoomRoute);

export default router;
