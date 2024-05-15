import 'dotenv/config'
import cors from 'cors'
import './passport_conf.js'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import { GoogleGenerativeAI } from "@google/generative-ai"
import OpenAI from 'openai'
import mongoose from 'mongoose'
import ConversationModel from './models/ConversationModel.js'

const { ObjectId } = mongoose.Types;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
})
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1)
  });

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.geminiKey)

const app = express()
const PORT = process.env.PORT

app.use(cors({ credentials: true, origin: true }))
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
app.get("/success", isLoggedIn, (req, res) => {
  console.log('You are logged in')
  res.send(`Welcome ${req.user.displayName}, your userID is ${req.user.id}`)
})

app.get("/userdata", (req, res) => {
  res.json({ username: req.user.displayName })
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

async function talkToAi(userPrompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: userPrompt }],
    model: "gpt-3.5-turbo",
  });

  // let aiResponse = completion.choices[0].message.content
  let aiResponse = completion.choices[0].message.content

  return aiResponse
}

app.post("/api", async (req, res) => {
  const text = req.body.text
  const aiResp = await talkToAi(text)
  try {
    const conversation = new ConversationModel({ question: text, answer: aiResp });
    console.log(conversation)

    await conversation.save();

    console.log(aiResp)
    res.json(conversation)

  } catch (error) {
    console.log("api error", error)
    res.status(400).send(error);
  }
})

app.get("/conversations", async (req, res) => {
  try {
    // Use the find() method on your ConversationModel to retrieve all conversations
    const conversations = await ConversationModel.find();
    res.json(conversations);

  } catch (error) {
    console.error('Error retrieving conversations:', error);
    throw error; // You can handle or propagate the error as needed
  }
})

app.delete('/conversations/:id', async (req, res) => {
  try {
    const documentId = req.params.id;
    console.log("HEYY", documentId)

    const filterQuery = { _id: new ObjectId(documentId) };
    const result = await ConversationModel.deleteOne(filterQuery)

    console.log(result)
    // const deleteResult = await deleteDocument('conversations', filterQuery);


    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Document deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Document not found.' });
    }
  }
  catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => console.log("server running on port: " + PORT))