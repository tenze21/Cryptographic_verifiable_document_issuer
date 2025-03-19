import express from 'express';
const router= express.Router();
import { generateNewNonce, loginUser } from '../controllers/userController.js';

router.get("/nonce", generateNewNonce);
router.post("/login", loginUser);

export default router;