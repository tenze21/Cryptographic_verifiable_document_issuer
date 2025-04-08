import express from "express";
import {
  createMarksheet,
  getUnCompiledNumber,
  compileMarksheet,
  updateMarksheetStatus,
  getStudentMarksheet,
} from "../controllers/marksheetController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(protect, createMarksheet)
  .get(protect, getUnCompiledNumber);
router.patch("/compile", protect, admin, compileMarksheet);
router.patch("/update", protect, admin, updateMarksheetStatus);
router.get("/get", getStudentMarksheet);

export default router;