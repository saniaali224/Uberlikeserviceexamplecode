import status from 'http-status';
import EventSchema from '../Models/rideSchema';

const getRides = (req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	EventSchema.find({RiderId:req.user._id})
		.then(events => {
			res.status(status.OK).send(events);
		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'No Events!',
				err,
			});
		});
};

const addRide = (req, res) => {
	const { 
		cabName,
		cabDriverName,
		cabDriverId,
		pickupLocation,
		dropoffLocation,
		pickupTime,
		riderName
	} = req.body;

	const ride = new EventSchema({
		cabName,
		cabDriverName,
		cabDriverId,
		pickupLocation,
		dropoffLocation,
		pickupTime,
		riderName
	});
	ride
		.save()
		.then(savedEvent => {
			res.status(status.OK).send({
				savedEvent,
				Message: 'Ride Created Successfully',
				type: status.Ok,
			});
		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: status.INTERNAL_SERVER_ERROR,
				err,
			});
		});
};

const deleteEvent = (req, res) => {
	const { id } = req.params;
	EventSchema.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(status.OK).send({
				Message: 'Event Deleted Successfully.',
			});
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Delete.',
				err,
			});
		}
	});
};

const editEvent = (req, res) => {
	const { id } = req.params;
	const query = { $set: req.body };
	EventSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
		if (err) {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Update.',
			});
		} else {
			res.status(status.OK).send({
				Message: 'Successfully Updated.',
				result,
			});
		}
	});
};

const getRideInformation = (req, res) => {
	const { eid } = req.params;

	EventSchema.findOne({ _id: eid })
		.then(event => {
			if (!event) {
				return res.status(status.NOT_FOUND).send({
					Message: 'Ride not found',
				});
			}
			return res.status(status.OK).send(event);
		})
		.catch(err => {
			return res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Internal Server Error',
				err,
			});
		});
};

export default { getRides, addRide, deleteEvent, editEvent, getRideInformation };
