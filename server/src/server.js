const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session'); // controls the session and sends the cookie to the browser in a encrypted manner. Reason for encrypting the cookie is everyone can see the cookie in the browser so we are encrypting with the keys.
const path = require('path');
const auth = require('./oauth/passport-setup');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('../../../dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// To initialize passport in our application
app.use(passport.initialize());

// Passport to use seesion
app.use(passport.session());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.use(function (req, res, next) {
    console.log("I am in  middleware");

    if (req.originalUrl && (req.originalUrl.includes('/login') || req.originalUrl.includes('/login/callback'))) {
        console.log('inside login');
        return next();
    }
    console.log(req.originalUrl);
    if (req.session.passport) {
        next();
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    if (req.session.passport && req.session.passport.user) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname + '/templates/login.html'));
    }
})

// app.get('/', (req, res) => {
//     if (req.session.passport && req.session.passport.user) {
//         res.send('You are logged in');
//     } else {
//         res.send('Not logged in');
//     }
// })

app.get('/failed', (req, res) => {
    res.send('Authentication Failed');
})

app.get('/api/call', (req, res) => {
    res.send('API called');
})

app.get('/signedin/:user', (req, res) => {
    res.send(`welcome man ${req.params.user}`);
})

// Whenever this route is called, passport communicates with google with the google strategy and client id and secret key
app.get('/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Reason for using passport.authenticate again - Once the user has been authenticated with the consent screen, it will get query param with the redirect uri (ex. http://localhost:3000?code=1234) and on the fly passport exchanges the code with google and get the profile information.
app.get('/login/callback/google',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect signed page.
        res.sendFile(path.join(__dirname + '../../../dist/index.html'));
    });

app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/callback/facebook',
    passport.authenticate('facebook', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect signed page.
        res.sendFile(path.join(__dirname + '../../../dist/index.html'));
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.get('*', (req, res) => {
    if (req.session.passport) {
        res.sendFile(path.join(__dirname + '../../../dist/index.html'));
    } else {
        res.redirect('/login');
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})