// Define our dependencies
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request = require('request');
const handlebars = require('handlebars');

// Import constants for .env file
require('dotenv').config();

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = '<YOUR CLIENT ID HERE>';
const TWITCH_SECRET = '<YOUR CLIENT SECRET HERE>';
const SESSION_SECRET = '<SOME SECRET HERE>';
const CALLBACK_URL = '<YOUR REDIRECT URL HERE>'; // You can run locally with - http://localhost:3000/auth/twitch/callback

const {
  TWITCH_CLIENT_ID,
  TWITCH_SECRET,
  SESSION_SECRET,
  CALLBACK_URL
} = process.env;

// Initialize Express and middlewares
const app = express();
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  const options = {
    url: 'https://api.twitch.tv/helix/users',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json',
      Authorization: 'Bearer ' + accessToken
    }
  };

  request(options, function(error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
};
