const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');
const { encrypt } = require('./server/middleware/EncryptDecrypt');

const Quiz = require('./server/models/quiz.models');

//init middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to DB
connectDB();

//routes
app.use('/api/auth', require('./server/routes/auth.routes'));
app.use('/api/employer', require('./server/routes/employer.routes'));
app.use('/api/quiz', require('./server/routes/quiz.routes'));
app.use('/api/respondent', require('./server/routes/respondent.routes'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}



//init server connection
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

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

app.post("/send/:quizId", async(req, res) => {
	const quiz_id = req.params.quizId;

    const quizTitle = await Quiz.findById(quiz_id);

    const { email } = req.body;

    const emailHash = encrypt(email);

    var url = '';
    if(process.env.NODE_ENV === 'production') {
        url = `${req.protocol}://${req.hostname}/${emailHash.iv}/userInfo/${emailHash.content}/quiz/${quiz_id}`;
    } else {
        url = `${req.protocol}://${req.hostname}:3000/${emailHash.iv}/userInfo/${emailHash.content}/quiz/${quiz_id}`;
    }

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "quizbanana467@gmail.com",
			pass: "OSUcapston1111",
		},
	});

    readHTMLFile(__dirname + '/client/src/email/RespondentEmail.html', (err, html) => {
        var template = handlebars.compile(html);
        var replacements = {
            quizTitle: quizTitle.title,
            url: url
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: "quizbanana467@gmail.com",
            to: req.body.email,
            subject: `${req.body.name}`,
            html: htmlToSend,
            attachments: [{
                filename: 'logo_small.png',
                path: __dirname + '/client/src/assets/logo_small.png',
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
    })
});