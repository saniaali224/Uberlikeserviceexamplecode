import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';
import awsHandler from './aws';

const adminSignUp = (req, res, next) => {
	const { name, password, email, imageUrl } = req.body;
	if (imageUrl !== '' && req.file !== undefined) {
		awsHandler
			.UploadToAws(req.file)
			.then((image) => {
				const query = { email };
				  console.log(image);
				  console.log(query);
				  
				  
				Model.AdminModel.findOne(query)
					.then((admin) => {
						if (admin) {
							if (admin.email == email) {
								res.status(400);
								next(new Error('Email Already Taken.'));
							}
						} else {
							bcryptjs.hash(password, 12).then((hashedpassword) => {
								const Admin = new Model.AdminModel({
									name,
									password: hashedpassword,
									email,
									imageUrl: image,
									userType: 'rider',
								});
								console.log(Admin);
								Admin.save()
									.then((SavedUser) => {
										console.log(SavedUser);
										return res.status(200).send({
											Message: 'Account Created Successfully.',
											SavedUser,
										});
									})
									.catch((err) => {
										res.status(500);
										next(
											new Error(
												`Unable to Create User. Please Try later. ${err}`,
											),
										);
									});
							});
						}
					})
					.catch((err) => {
						res.status(500);
						next(new Error(err));
					});
			})
			.catch((err) => {
				res.status(500);
				next(new Error(err));
			});
	} else {
		res.status(500);
		next(new Error('Image is required'));
	}
};

export default adminSignUp;
