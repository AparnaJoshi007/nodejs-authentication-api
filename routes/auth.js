import { Router } from 'express';
import passport from 'passport';

let User;
const router = new Router();

const setUserModel = (userModel) => {
  User = userModel;
};

router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.json({
        error: err
      });
    }

    return res.status(200).end();
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (error, accessToken) => {
    if (error !== null) {
      return res.json({
        error: err
      });
    }

    return res.json({
      payload: {
        accessToken,
      },
    });
  })(req, res, next);
});

module.exports = {
  setUserModel,
  router
};
