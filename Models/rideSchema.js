import mongoose from 'mongoose';

const RideSchema = new mongoose.Schema(
    {
        cabNumber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cab',
        },
        cabDriverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
        },
        pickupLocation: String,
        dropoffLocation: String,
        pickupTime: String,
        riderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Rides', RideSchema);
