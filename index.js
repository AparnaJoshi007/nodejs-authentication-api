const DEFAULT_PORT = process.env.DEFAULT_PORT || 8001;
const HOST = process.env.HOST || '0.0.0.0';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import dotenv from 'dotenv';

import connect from './models';
import { router as authRoutes, setUserModel } from './routes/auth';
import { router as postRoutes } from './routes/posts';
import authenticate from './middleware/authenticate';
import getLocalSignupStrategy from './passport/local-signup';
import getLocalLoginStrategy from './passport/local-login';

dotenv.config();

const app = express();

const DB_URI = process.env.DB_URI;
connect(DB_URI);
const User = mongoose.model('User');
setUserModel(User);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('local-signup', getLocalSignupStrategy(User));
passport.use('local-login', getLocalLoginStrategy(User));
app.use('/auth', authRoutes);
app.use('/api', authenticate, postRoutes);

app.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('\n\tStarting server...');
  console.log(`Running locally at ${HOST}:${DEFAULT_PORT}`);
});
