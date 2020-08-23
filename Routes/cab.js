import express from 'express';
import events from '../Controllers/cab';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
// import eventValidator from '../validations/event';

const eventRouter = express.Router();

eventRouter.post(
	'/add',
	isAdminMiddleware.isManagerOwner,
	events.addCabinfo,
);

eventRouter.get('/', isAdminMiddleware.isManagerOwner, events.getCab);

eventRouter.get('/:eid', isLoggedInUser.isLoggedIn, events.getSingleCab);

// only admin can delete
eventRouter.delete(
	'/delete/:id',
	isAdminMiddleware.isManagerOwner,
	events.deleteEvent,
);

eventRouter.patch('/edit/:id', isLoggedInUser.isLoggedIn, events.editEvent);

export default eventRouter;
