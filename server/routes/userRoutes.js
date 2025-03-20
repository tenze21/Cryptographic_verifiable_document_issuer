import express from 'express';
import { logout } from '../controllers/userController.js';

const router= express.Router();
import { generateNewNonce, loginUser } from '../controllers/userController.js';

router.get("/nonce", generateNewNonce);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;