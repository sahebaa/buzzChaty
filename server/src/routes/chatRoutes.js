import express from "express";
const router = express.Router();
import { createChat,getChat,updateMessage,deleteMessage,getAllChats} from "../controllers/chatController.js";

// Home page route.
router.post("/createChat", createChat);
router.post("/getUserChats",getChat);
router.post("/updateMessage",updateMessage);
router.post("/deleteMessage",deleteMessage);
router.post("/getAllChats",getAllChats);

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

export default router;

