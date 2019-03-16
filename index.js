const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Person = require('./models/Person');
const chat_user = require('./chat_user');
const passport = require('passport');
const passport_GoogleStrategy = require('./Strategies/google_Strategy');
const passport_FBStrategy = require('./Strategies/fb_strategy');
const googleApi = require('./router/api');
const keys = require('./config/setup')
require('dotenv').config()

//Middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set('view engine', 'ejs');


//Attempt to connect to DB
mongoose
    .connect(keys.mongoURI || process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log(err))

//route --> test
app.get('/', (req, res) => {
    res.render('home')
});

//Middleware
app.use('/auth', googleApi);

app.listen(port, () => {
    console.log(`App is running at ${port}`);
});