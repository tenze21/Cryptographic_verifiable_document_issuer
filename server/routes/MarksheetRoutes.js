import express from 'express';
import { createMarksheet,getUnCompiledNumber, compileMarksheet } from '../controllers/marksheetController.js';
import { admin } from '../middleware/authMiddleware.js';

const router= express.Router();
router.route("/").post(createMarksheet).get(getUnCompiledNumber);
router.patch("/compile", admin, compileMarksheet);

export default router;