import express, { Router } from 'express';

import AuthRoute from './AuthRoute';
import CreditCardRoute from './CreditCardRoute';
import HotelRoute from './HotelRoute';
import RoomRoute from './RoomRoute';
import TicketRoute from './TicketRoute';
import UserRoute from './UserRoute';
import PurchaseRoute from './PurchaseRoute';

const router = Router();

router.use(express.json());

router.use('/hotel', HotelRoute);
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/room', RoomRoute);
router.use('/card', CreditCardRoute);
router.use('/ticket', TicketRoute);
router.use('/purchase', PurchaseRoute);


export default router;
