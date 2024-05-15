# Ascend-Chat-AI

## Introduction
AscendChatAI is an AI chatbot/ note taking app designed for future students matriculating into the Resilient Coders bootcamp. The goal is for students to have a reliable virtual assistant to ask questions to during their full-stack development studies and have it be saved in note card format. *Note: This is a prototype of the final product.*

## Features
- **Real-time Messaging**: Users can engage in real-time conversations with the AI chatbot, receiving instant responses to their queries.
- **AI-powered Responses**: The chatbot utilizes OpenAI's ChatGPT technology (`gpt-3.5-turbo-instruct model`) to generate intelligent responses based on user input.
- **Note Cards**: One of the best ways to learn is to ask questions! With every question the student asks, the app will create note cards displaying both question and answer in what we call a "note card" history.

## Preview
![ResilientGpt-Cover](/frontend/src/assets/preview.png)

## Getting Started
1. Clone the repository: `git clone https://github.com/cintnguyen/ascend-chat-ai.git`
2. Navigate to the backend server directory: `cd backend`
3. Create an .env file with *your* OpenAI API, and MongoDB information (`gpt-3.5-turbo-instruct model`):
    ```
    MONGODB_URL={your key} 
    OPENAI_API_KEY={your key}
    ```
4. Install server dependencies: `npm install`
5. Run the server: `npm start`
6. Navigate to the client directory (in a new terminal): `cd frontend`
7. Install client dependencies: `npm install`
8. Run the client: `npm run dev`
9. The app is now live at http://localhost:5173!

## Tech Stack
- React
- JavaScript
- HTML
- CSS
- MongoDB
- NextUI, Tailwind
