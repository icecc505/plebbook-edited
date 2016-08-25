// Adds express to our project
const express = require('express');
// Adds express handlebars to our project
const exphbs = require('express-handlebars');
// Adds sequelize to the project
const Sequelize = require('sequelize');
// Adds body-parser so we can read form data
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const passportlocal = require('passport-local');

const app = express();

// Define folder for public assets
app.use(express.static('public'));

// Set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main.handlebars'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// Setup database
var sequelize = new Sequelize('testdb', 'root', 'Home3949');

// Setup our models
const Status = sequelize.define('status', {
  username: Sequelize.STRING,
  text_status: Sequelize.STRING
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

sequelize.sync();

passport.use(new passportLocal(

function(uname, password, done) {
  user.findOne({username: uname}).then(function(user) {

  if(!user) {
    return done(null, false, {message: "User could not be found"});
  }

if (user.password !== bcrypt.hashSync(password)) {
  return done(null, false, {message: "password is incorrect"});

}

    return done(null, user);
  });
}

));
// This function renders our home page
app.get('/', function (req, res) {

  Status.findAll().then(function(statuses) {

    res.render('home.handlebars',
      {title: "Slagging And Shagging", statuses: statuses});

  });

});

// This function will handle POST requests to our home page
app.post('/', function(req, res) {

  Status.create({
    username: "Timmaaaaaaaa",
    text_status: req.body.status
  }).then(function() {
    res.render("status_success");
  });

});

// This function renders our about page
app.get('/about', function(req, res) {
  res.render('about.handlebars', {title: "About"});
});

app.get('/signup', function(req, res) {
  res.render('signup', {title: "Join Us!"});
});

app.get('/login', function(req, res) {
  res.render('login', {title: "Login"});
});

app.post('/signup', function(req,res) {

const hash = bcrypt.hashSync(req.body.password);

  User.create({
    username: req.body.username,
    password: hash,
    email: req.body.email
  }).then(function() {
    res.render('account_created');
    });

  });


const port = 3000;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
