import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors({credentials: true, origin: true}))
app.use(express.json())

//Test Path for OpenAI Calls
app.get("/api/test", (req, res) => {
    try{
      const response = "Test Response"
      res.json({message: response})
    } catch (error) {
      res.status(500).json({error: "Error- No data"})
    }
  })
  
  app.listen(8080, () => console.log("server running on port: " + 8080))