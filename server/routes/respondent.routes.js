const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { decrypt } = require('../middleware/EncryptDecrypt');
const { check, validationResult } = require('express-validator');

const Respondent = require("../models/respondent.models");
const Quiz = require("../models/quiz.models");
const Employer = require("../models/employer.models");


var readHTMLFile = (path, callback) => {
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if(err) {
            callback(err);
            throw err;
        } else {
            callback(null, html);
        }
    });
};

// Route to get candidate info if it exists
router.get("/:iv/userInfo/:hashKey/quiz/:quizId", async (req, res) => {
	const hashKey = req.params.iv;
	const hashContent = req.params.hashKey;

	if (
		hashKey.length < 32 ||
		hashKey.length > 32 ||
		hashContent.length < 64 ||
		hashContent.length > 64
	) {
		res.status(404).json({ msg: "URL is incorrect" });
		return;
	}

	const emailObject = {
		iv: hashKey,
		content: hashContent,
	};

	const email = decrypt(emailObject);
	const respondent = await Respondent.findOne({ email: email });

	if (respondent) {
		return res.status(200).json(respondent);
	} else {
		res.status(200).json(email);
	}
});

// Route to create the candidate taking the quiz
router.post(
	"/:iv/userInfo/:hashKey/quiz/:quizId",
	[
		check(
			"firstName",
			"Appropriately enter your first name with a min of 2 characters and a max of 30"
		)
			.not()
			.isEmpty()
			.withMessage("Please enter your first name")
			.isAlpha("en-US", { ignore: " " })
			.withMessage("Only characters are allowed for your first and last name")
			.isLength({ min: 1, max: 30 })
			.withMessage(
				"A min length of 2 characters and a max of 30 characters is required for your first and last name"
			),
		check(
			"lastName",
			"Appropriately enter your last name with a min of 2 characters and a max of 30"
		)
			.not()
			.isEmpty()
			.withMessage("Please enter your last name")
			.isAlpha("en-US", { ignore: " " })
			.withMessage("Only characters are allowed for your first and last name")
			.isLength({ min: 1, max: 30 })
			.withMessage(
				"A min length of 1 character and a max of 30 characters is required for your first and last name"
			),
		check("school", "Please enter your school name").not().isEmpty(),
		check("dateOfBirth", "Please enter your date of birth").not().isEmpty(),
	],
	async (req, res) => {
		const { firstName, lastName, school, dateOfBirth, email } = req.body;

		try {
			const hashKey = req.params.iv;
			const hashContent = req.params.hashKey;

			const emailObject = {
				iv: hashKey,
				content: hashContent,
			};

			const emailHash = decrypt(emailObject);

			let respondent = await Respondent.findOne({ email: emailHash });

			if (respondent) {
				let quiz = await Quiz.findById(req.params.quizId);

				const respondentQuiz = await Respondent.findOne({
					$and: [
						{ email: emailHash },
						{ quizzes: { $elemMatch: { quiz_id: quiz._id } } },
					],
				});

				console.log(respondentQuiz);

				if (respondentQuiz) {
					return res
						.status(400)
						.json({ msg: "You have already submitted this quiz" });
				}

				res.status(200).end();
			} else {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				let respondent = new Respondent({
					firstName,
					lastName,
					school,
					dateOfBirth,
					email,
				});

				await respondent.save();
				res.status(200).end();
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: err.message });
		}
	}
);

// Route to load the candidate info during taking the quiz
router.get("/:iv/takeQuiz/:hashKey/quiz/:quizId", async (req, res) => {
	try {
		const hashKey = req.params.iv;
		const hashContent = req.params.hashKey;

		const emailObject = {
			iv: hashKey,
			content: hashContent,
		};

		console.log(emailObject);

		const email = decrypt(emailObject);

		let quiz = await Quiz.findById(req.params.quizId);
		let respondent = await Respondent.findOne({ email: email });

		if (!respondent) {
			return res.status(400).json({ msg: "Candidate info not found" });
		}

		res.status(200).json({ respondent: respondent, quiz_resp: quiz });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.patch('/:iv/takeQuiz/:hashKey/quiz/:quizId', async(req, res) => {
    const { timeTaken, questionsAnswered } = req.body;
    const hashKey = req.params.iv;
    const hashContent = req.params.hashKey;

    const emailObject = {
        iv: hashKey,
        content: hashContent
    };

    const email = decrypt(emailObject);

    try {
        let user = await Respondent.findOne({ email: email });
        let quiz = await Quiz.findById(req.params.quizId);
        let employer = await Employer.findById(quiz.employer_id);

        await Respondent.findOneAndUpdate(
            { email: email },
            { $push: 
                { 
                    quizzes: {
                        quiz_id: req.params.quizId,
                        timeTaken: timeTaken, 
                        questionsAnswered: questionsAnswered,
                    },
                }
            },
            { new: true }
        );

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: "quizbanana467@gmail.com",
                pass: "OSUcapston1111"
            }
        });

        readHTMLFile(path.join(__dirname, '..', '..', 'client', 'src', 'email', 'QuizCompleteEmail.html'), (err, html) => {
            var template = handlebars.compile(html);
            var replacements = {
                employerFirstName: employer.firstName,
                respondentEmail: user.email,
                quizTitle: quiz.title,
            };
            var htmlToSend = template(replacements);
            const mailOptions = {
                from: "quizbanana467@gmail.com",
                to: employer.email,
                subject: `Quiz ${quiz.title} Completed`,
                html: htmlToSend,
                attachments: [{
                    filename: 'logo_small.png',
                    path: path.join(__dirname, '..', '..', 'client', 'src', 'assets', 'logo_small.png'),
                    cid: 'banana'
                }]
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: error });
                } else {
                    res.json({ msg: "success" });
                }
            });
        });

        res.status(202).end();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

//get all respondents without quizzes array and only the current quiz
router.get("/quiz/:quizId", async (req, res) => {
	try {
		let respondents = await Respondent.find({
			"quizzes.quiz_id": req.params.quizId,
		}).lean();
		for (respondent of respondents) {
			let filtered_quiz = respondent.quizzes.find(
				(quiz) => quiz.quiz_id == req.params.quizId
			);
			respondent.current_quiz = filtered_quiz;
			delete respondent.quizzes;
			// respondent.toObject();
		}
		console.log(respondents);
		res.status(200).json(respondents);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Route to load the candidate info by respondent id
router.get("/:respondentId/quiz/:quizId", async (req, res) => {
	try {
		// let quiz = await Quiz.findById(req.params.quizId);
		let respondent = await Respondent.findById(req.params.respondentId);

		let quiz_resp_ans = await respondent.quizzes.find(
			(quiz) => quiz.quiz_id.toString() === req.params.quizId.toString()
		);

        console.log(quiz_resp_ans);

		if (!respondent) {
			return res.status(400).json({ msg: "Candidate info not found" });
		}
		if (!quiz_resp_ans) {
			return res.status(400).json({ msg: "Quiz info not found" });
		}
		res
			.status(200)
			.json({ respondent: respondent, quiz_resp_ans: quiz_resp_ans });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.put("/:respondentId/quiz/:quizId", async (req, res) => {
	try {
		respondent = await Respondent.findByIdAndUpdate(
			req.params.respondentId,
			{
				$pull: {
					quizzes: {
						quiz_id: req.params.quizId,
					},
				},
			},
			{ new: true }
		);
		updated_respondent = await Respondent.findByIdAndUpdate(
			req.params.respondentId,
			{
				$push: {
					quizzes: {
						quiz_id: req.params.quizId,
						questionsAnswered: req.body.questionsAnswered,
						totalPointsGiven: req.body.totalPointsGiven,
						timeTaken: req.body.timeTaken,
					},
				},
			},
			{ new: true }
		);
		res.status(200).json(updated_respondent);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: err.message });
	}
});


//get quiz without auth
router.get("/getquiz/:id", async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.status(200).json(quiz);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;
