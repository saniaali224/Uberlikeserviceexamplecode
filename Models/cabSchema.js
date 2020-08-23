import mongoose from 'mongoose';

const CabSchema = new mongoose.Schema(
	{
		cabNumber: String,
		DriverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Admin',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Cab', CabSchema);
