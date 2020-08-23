import express from 'express';
import events from '../Controllers/ride';

// // auth middlewares for admin
// import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// // validations
// import eventValidator from '../validations/event';

const eventRouter = express.Router();

eventRouter.post(
	'/add',
	isLoggedInUser.isLoggedIn,
	events.addRide,
);

eventRouter.get('/ride', isLoggedInUser.isLoggedIn, events.getRides);

eventRouter.get('/:eid', isLoggedInUser.isLoggedIn, events.getRideInformation);

// only admin can delete
eventRouter.delete(
	'/delete/:id',
	events.deleteEvent,
);

eventRouter.patch('/edit/:id', isLoggedInUser.isLoggedIn, events.editEvent);

export default eventRouter;
