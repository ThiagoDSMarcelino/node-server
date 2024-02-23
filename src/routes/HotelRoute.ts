import { Router } from 'express';

import authHandler from '../middleware/authHandler';

const HotelRoute = Router();

// Validate
HotelRoute.post('/', authHandler, async (_, res, __) => {
	return res.status(200).json();
});

export default HotelRoute;
