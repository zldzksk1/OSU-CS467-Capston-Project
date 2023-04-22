const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

const Employer = require('../models/employer.models');


router.post('/',
    check('firstName', 'Appropriately enter your first name with a min of 2 characters and a max of 30')
        .not()
        .isEmpty()
        .withMessage('Please enter your first name')
        .isAlpha('en-US',{ignore: ' '})
        .withMessage('Only characters are allowed for your first and last name')
        .isLength({ min: 1, max: 30})
        .withMessage('A min length of 2 characters and a max of 30 characters is required for your first and last name'),
    check('lastName', 'Appropriately enter your last name with a min of 2 characters and a max of 30')
        .not()
        .isEmpty()
        .withMessage('Please enter your last name')
        .isAlpha('en-US',{ignore: ' '})
        .withMessage('Only characters are allowed for your first and last name')
        .isLength({ min: 1, max: 30})
        .withMessage('A min length of 1 character and a max of 30 characters is required for your first and last name'),
    check('organization', 'Please enter your company or organization name')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail()
        .not()
        .isEmpty(),
    check('password', 'Password of at least 8 characters is required for registering')
        .isLength({ min: 8 })
        .not()
        .isEmpty()
        .withMessage('Please enter your password'),
	check('confirmPassword')
		.not()
		.equals('password')
		.withMessage('Passwords do not match!')
, async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { firstName, lastName, organization, email, password } = req.body;

		try {
			// Check if user is already registered
			let user = await Employer.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}

			// Create new user
			user = new Employer({
				firstName,
				lastName,
				organization,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};
			const jwtSecret = config.get("jwtSecret");
			jwt.sign(
				payload,
				jwtSecret,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.status(201).json({ token });
				}
			);

			//For Testing Purposes only
			// return res.status(201).json({ user });
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: err.message });
		}
	}
);

module.exports = router;
