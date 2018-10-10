'use strict';

const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Router = require('express').Router;
const debug = require('debug')('cfgram:auth-router');
import superagent from 'superagent';

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.get('/oauth/google/code', (req, res, next) => {
  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`
    })
    .then((response) => {
      console.log('POST: oauth/v4/token', response.body);
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${response.body.access_token}`);
    })
    .then((response) => {
      console.log('GET: people/me/openIdConnect', response.body);
      return User.handleOAUTH(response.body);
    })
    .then((user) => user.tokenCreate())
    .then((token) => {
      console.log('my oauth token', token);
      res.cookie('X-Slugchat-Token', token);
      res.redirect(process.env.CLIENT_URL);
    })
    .catch((err) => {
      console.error(err);
      // this is the fail condition
      // res.redirect(process.env.CLIENT_URL);
    })
  }
})

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  if(!req.body.password) next(createError(400, 'password required'));
  if(!req.body.username) next(createError(400, 'username required'));
  if(!req.body.email) next(createError(400, 'email required'));

  let password = req.body.password;
  delete req.body.password;
  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then((user) => user.save())
  .then((user) => user.generateToken())
  .then((token) => res.send(token))
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, (req, res, next) => {
  debug('GET: /api/signin');

  if(!req.auth.username) return createError(400, 'username required');

  User.findOne({ username: req.auth.username })
  .then((user) => user.comparePasswordHash(req.auth.password))
  .then((user) => user.generateToken())
  .then((token) => res.send(token))
  .catch(next);
});
