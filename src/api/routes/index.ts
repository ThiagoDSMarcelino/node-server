import express, { Router } from 'express';

import AuthRoute from './AuthRoute';
import HotelRoute from './HotelRoute';
import RoomRoute from './RoomRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use(express.json());

router.use('/hotel', HotelRoute);
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/room', RoomRoute);

export default router;
