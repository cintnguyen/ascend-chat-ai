// Import required modules
import mongoose from 'mongoose';

// Define a Mongoose schema
const { Schema, model } = mongoose;
const conversationSchema = new Schema({
  question: String,
  answer: String
});

// Create a Mongoose model
const ConversationModel = model('Conversation', conversationSchema);

// Export the model
export default ConversationModel;