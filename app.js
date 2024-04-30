
import createErrors from 'http-errors';
import express from 'express';
import { config } from 'dotenv';
import mongo from 'mongodb';
import cookieParser  from 'cookie-parser';
import pluralize from 'pluralize';
import logger from 'morgan';
import { engine } from 'express-handlebars';
import  routes from './index.js';
import passport from 'passport';
import session from 'express-session';
import { default as connectMongoDBSession}    from 'connect-mongodb-session';

const app = express();
app.locals.pluralize;

// view engine setup
app.set('views', 'views');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

//session variables
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
uri= process.env.URI,
  collection: 'sessions'
});

app.use(session({
resave: false,
secret: process.env.SECRET,
saveUninitialized: false,
store: store
}));

app.use(passport.authenticate('session'));

const route= new routes();

//persist user information in the login session
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.get("/",route.landingPage);
app.get("/signup", route.signup);
//app.get("/login", route.login);
//app.get("/home", route.home);

app.post("/signup", route.signUser);

app.listen(3000, ()=>{
console.log("Running on port 3000");
});