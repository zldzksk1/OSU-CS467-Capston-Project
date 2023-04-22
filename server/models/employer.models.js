const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Employer', EmployerSchema);