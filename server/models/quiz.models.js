const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    questions: [{
        question_id: mongoose.Types.ObjectId,
        question: {
            type: String,
            required: true
        },
        answerOptions: [String],
        points: {
            type: Number,
            required: true
        },
        answer: [String],
        questionType: String
    }],
    timeLimit: Number,
    totalScore: Number,
    totalEmailsSent: Number,
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);