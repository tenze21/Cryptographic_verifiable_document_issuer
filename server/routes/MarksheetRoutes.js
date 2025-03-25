import express from 'express';
import { createMarksheet, getMarksheetByIssuer } from '../controllers/marksheetController.js';

const router= express.Router();
router.get("/:issuer", getMarksheetByIssuer);
router.post("/", createMarksheet);

export default router;