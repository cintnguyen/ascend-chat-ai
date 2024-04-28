import 'dotenv/config'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

const conf = {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:8420/google/callback",
  passReqToCallback: true 
}

passport.use(new Strategy(conf, (req, aToken, rToken, pro, done) => done(null, pro)))

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))