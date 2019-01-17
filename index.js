// Define our dependencies
const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const handlebars     = require('handlebars');

// Import constants for .env file
require('dotenv').config()

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = '<YOUR CLIENT ID HERE>';
const TWITCH_SECRET    = '<YOUR CLIENT SECRET HERE>';
const SESSION_SECRET   = '<SOME SECRET HERE>';
const CALLBACK_URL     = '<YOUR REDIRECT URL HERE>';  // You can run locally with - http://localhost:3000/auth/twitch/callback