const mongoose = require("mongoose");

const RespondentSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		school: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: String,
			required: true,
		},
		score: Number,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashKey: String,
		quizzes: [
			{
				_id: false,
				quiz_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Quiz",
				},
				timeTaken: Number,
				questionsAnswered: [
					{
						_id: false,
						question_id: mongoose.Types.ObjectId,
						answerGiven: [String],
						pointsGiven: Number,
					},
				],
				totalPointsGiven: Number,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Respondent", RespondentSchema);
