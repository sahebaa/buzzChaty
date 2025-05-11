import express from 'express';
import dotenv from 'dotenv'
import chatRouter from './src/routes/chatRoutes.js'
import mongoose from 'mongoose';
import addUsers from './src/controllers/addUsers.js';
import contactRouter from './src/routes/contactRoutes.js';
import signUpRouter from './src/routes/signUpRoutes.js';
import cors from 'cors';

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend URL
  credentials: true, // if using cookies/auth headers
}));

const PORT=process.env.PORT;
const url=process.env.MONGO_URI;

app.use("/api/chat",chatRouter);
app.use("/api/contact",contactRouter);
app.use("/api/userSignUp",signUpRouter);

console.log(url);

mongoose.connect(url)
  .then(() => {
    console.log('✅ Connected to MongoDB with Mongoose');

    // Start server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
   //addUsers();
  })
  .catch(err => {
    console.error('❌ Mongoose connection error:', err.message);
    process.exit(1);
  });