import express from 'express';
import { createMarksheet } from '../controllers/marksheetController.js';

const router= express.Router();
router.post("/", createMarksheet);

export default router;