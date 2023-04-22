const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

const { check, validationResult } = require('express-validator');

const Employer = require('../models/employer.models');

router.post('/', [
    check('email', 'Please enter your email').not().isEmpty().exists(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
        let user = await Employer.findOne({ email });
        
        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const jwtSecret = config.get('jwtSecret');
        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/', auth, async(req, res) => {
    try {
        const user = await Employer.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.put(
	"/",
	auth, [
	check("firstName")
		.not()
		.isEmpty()
		.withMessage("Please enter your first name")
		.isAlpha("en-US", { ignore: " " })
		.withMessage("Only characters are allowed for your first and last name")
		.isLength({ min: 1, max: 30 })
		.withMessage(
			"A min length of 1 character and a max of 30 characters is required for your first and last name"
		),
	check("lastName")
		.not()
		.isEmpty()
		.withMessage("Please enter your last name")
		.isAlpha("en-US", { ignore: " " })
		.withMessage("Only characters are allowed for your first and last name")
		.isLength({ min: 1, max: 30 })
		.withMessage(
			"A min length of 1 character and a max of 30 characters is required for your first and last name"
		),
	check("organization", "Please enter your company or organization name")
		.not()
		.isEmpty(),
	check("email", "Please enter a valid email").isEmail().not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const employerEdits = {};
		employerEdits.firstName = req.body.firstName;
		employerEdits.lastName = req.body.lastName;
		employerEdits.email = req.body.email;
		employerEdits.organization = req.body.organization;

		try {
			let user = await Employer.findById(req.user.id).select("-password");

			if (!user) {
				return res.status(404).json({ msg: "User not found" });
			}
			user = await Employer.findByIdAndUpdate(
				req.user.id,
				{ $set: employerEdits },
				{ new: true }
			);
			console.log(user);
			res.status(200).json(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

router.delete("/", auth, async (req, res) => {
    try {
        let user = await Employer.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
		
        await Employer.findByIdAndDelete(req.user.id);

        res.status(204).json({ msg: "Employer profile has been deleted." });

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.patch('/', [
    check('password', 'Please enter your current password')
        .not()
        .isEmpty()
        .exists(),
    check('newPassword', 'Please enter a new password.')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('New password must at least 8 characters.'),
    check('confirmNewPassword')
        .not()
        .equals('newPassword')
        .withMessage('New password does not match!')
], auth, async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { password, newPassword } = req.body;

    try {
        const user = await Employer.findById(req.user.id).select('password');

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Password.' });
        }

        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);

        await Employer.findByIdAndUpdate(
            req.user.id,
            { $set: { 'password': newPassword }}, { new: true }
        );

        res.status(204).json({ msg: 'Password Updated!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
