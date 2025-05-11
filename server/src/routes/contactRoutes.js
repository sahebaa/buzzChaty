import express from 'express';
const router=express.Router();
import { getAutoSuggestions,editNameForUser,addContactForUser } from '../controllers/contactController.js';

router.get("/getAutoSuggestions",getAutoSuggestions);
router.post("/editNameForUser",editNameForUser);
router.post("/addContactForUser",addContactForUser);

export default router;