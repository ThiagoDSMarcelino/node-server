import express from 'express';

const UserRoute = express.Router();

UserRoute.post('/', () => 'Test');

export default UserRoute;
