const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		email: {
			type: String,
		},
		userType: {
			type: String,
			default: 'rider',
		},
		imageUrl: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Admin', adminSchema);
