const express = require('express');
var app = express();

// Config
const config = require('./config/default.json');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));
app.use(bodyParser.json({ limit: '5mb' }));

// var nodemailer = require('nodemailer');
require('dotenv').config();
const session = require('express-session');

app.use(express.json());
var cors = require('cors');
let whitelist = ['http://localhost:4200', 'https://give-the-need.web.app'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token',
        'Content-Range', 'Access-Control-Allow-Methods', '*'],
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
};
app.use(cors(corsOptions));

const uuid = require('uuid').v4;
const MongoStore = require('connect-mongo');
const sess = {
  key: config.cookie.name,
  secret: config.app.secret,
  // cookie: {
  //   domain: config.cookie.domain,
  //   path: config.cookie.path,
  //   maxAge: config.cookie.validity * 1000,
  //   httpOnly: false,
  // },
  resave: false,
  saveUninitialized: true,
  // store: store,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : config.db.mongodb_session_store_url + config.db.session_db_name + config.db.session_db_options,
    ttl: config.cookie.validity,
    autoRemove: 'native', // Default
  }),
  name: config.cookie.name,
  genid: function () {
    return uuid() // use UUIDs for session IDs
  },
};
app.use(session(sess));

// Routes
const allRoutes = require('./routes');
app.use(config.app.prefix, allRoutes);

const hostname = '127.0.0.1';
const port = 3000;
// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;

/*
const transport = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SOME,
        pass: process.env.PAST
    }
}
var transporter = nodemailer.createTransport(transport);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

app.post('/give-the-need/api/contact-us', sendContactUsEmail);
app.post('/give-the-need/api/hire', sendHireEmail);
app.post('/give-the-need/api/hiring', sendHiringEmail);

async function sendContactUsEmail(req, res) {
    try {
        console.log('req.body', req.body);
        var mailOptions = {
            // from: req?.from,
            to: req.body.email,
            subject: req.body.subject || process.env.CONTACT_US_EMAIL_SUBJECT,
            html: `<p>Hello ${req.body.name},</p>
            <p>Thank you for contacting us. Have a nice day!</p>
            <p>Cheers,<br>Give The Need</p>`
        };

        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

async function sendHireEmail(req, res) {
    try {
        var mailOptions = {
            // from: req?.from,
            to: req.body.email || process.env.TO_EMAIL,
            subject: process.env.HIRE_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>Thank you for reaching out to us. Have a nice day!</p>
            <p>Cheers,<br>Give The Need</p>`
        };

        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

async function sendHiringEmail(req, res) {
    try {
        var mailOptions = {
            // from: req?.from,
            to: req.body.email || process.env.TO_EMAIL,
            subject: process.env.GET_HIRED_EMAIL_SUBJECT,
            html: `<p>Hello</p>
            <p>Thank you for reaching out to us, we will get back to you shortly. Have a nice day!</p>
            <p>Cheers,<br>Give The Need</p>`
        };
        console.log('mailOptions', mailOptions);
        
        sendEmail(mailOptions).then((doc) => {
            res.json({ error: false, success: true, message: "Email sent successfully", data: {} })
        }).catch(error => {
            res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
        });
    } catch (error) {
        res.error({ error: true, success: false, message: (error.message || error || error.error), data: {} });
    }
}

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Give The Need API'
    })
})

app.listen(port, hostname, function () {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});

module.exports = router;
module.exports = app;
*/