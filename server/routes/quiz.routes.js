const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const Employer = require("../models/employer.models");
const Quiz = require("../models/quiz.models");

router.get("/", auth, async (req, res) => {
	try {
		const quizzes = await Quiz.find({ employer_id: req.user.id }).sort({ createdAt: -1 });
		res.status(200).json(quizzes);
		console.log(quizzes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.get("/:id", auth, async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.status(200).json(quiz);
		console.log(quiz);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.patch("/:id", auth, async (req, res) => {

	try {
		const quiz = await Quiz.findByIdAndUpdate(
			req.params.id,
			{
				"totalEmailsSent": req.body.totalEmailsSent
			},
			{ new: true }
		);
		res.status(200).json({ msg: "Email Sent Count Updated.", quiz });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: err.message });
	}
});
router.delete("/:id", auth, async (req, res) => {
	try {
		await Quiz.findByIdAndDelete(req.params.id);

        await Employer.findByIdAndUpdate(
            req.user.id, 
            { $pull: { 'quizzes': req.params.id } }, { new: true }
        );

		res.status(200).json({ msg: "Quiz has been deleted." });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Create Quiz
router.post(
	"/",
	auth,
	[
		check("title", "Title of quiz is required").not().isEmpty(),
		check("questions.*.question").not().isEmpty().withMessage('Must enter a question'),
		// check("questions.*.answerOptions").isLength({ min: 2 }).withMessage('Two answer options are needed to complete the question'),
		check("questions.*.points").not().isEmpty().isInt({ min: 1 }).withMessage('Minimum point value is 1 for the newly created question(s)'),
		check("questions.*.answer").isArray().isLength({ min: 1 }).withMessage('At least one answer must be provided'),
		check("timeLimit").not().isEmpty().isInt({ min: 1 }).withMessage('A value greater than zero must be given for the time limit'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, questions, timeLimit, totalScore } = req.body;

		try {
			const newQuiz = new Quiz({
				title,
				questions,
				timeLimit,
				totalScore,
				employer_id: req.user.id,
			});

			const quiz = await newQuiz.save();

			const updateUser = await Employer.findByIdAndUpdate(
				req.user.id,
				{ $push: { quizzes: quiz._id } },
				{ new: true }
			);

			console.log(updateUser);
			res.status(201).json(quiz);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: err.message });
		}
	}
);

module.exports = router;
