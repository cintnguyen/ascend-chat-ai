import 'dotenv/config'
import cors from 'cors'
import './passport_conf.js' 
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import { GoogleGenerativeAI } from "@google/generative-ai"
import OpenAI from 'openai'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.geminiKey)

const app = express()
const PORT = process.env.PORT

app.use(cors({credentials: true, origin: true}))
app.use(express.json())

// express session 
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Middleware used in protected routes to check if the user has been authenticated
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

// Base route
app.get("/home", (req, res) => {
  res.send("Home Page")
})

// Google Auth consent screen route
app.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ))

// Call back route
app.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
  }), (req, res) => {
    res.redirect('http://localhost:5173/messages')
  }
)

// Failed route if the authentication fails
app.get("/failed", (req, res) => {
  console.log('User is not authenticated')
  res.send("Failed")
})

// Success route if the authentication is successful
app.get("/success",isLoggedIn, (req, res) => {
  console.log('You are logged in')
  res.send(`Welcome ${req.user.displayName}, your userID is ${req.user.id}`)
})

app.get("/userdata", (req, res) => {
  res.json({username: req.user.displayName})
})

// Route that logs out the authenticated user  
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error while destroying session:', err)
    } else {
      req.logout(() => {
        console.log('You are logged out')
        res.redirect('/home')
      })
    }
  })
})

const openai = new OpenAI();

async function talkToAi(text) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${text}` }],
    model: "gpt-3.5-turbo",
  });

  let resp = completion.choices[0].message.content
  return resp
}

app.post("/api", isLoggedIn, async (req, res) => {
  const text = req.body.text
  const resp = await talkToAi(text)
  res.json({message: resp})
})

app.listen(PORT, () => console.log("server running on port" + PORT))