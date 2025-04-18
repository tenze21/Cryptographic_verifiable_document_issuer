import express from "express";
import {
  createMarksheet,
  getUnCompiledNumber,
  compileMarksheet,
  updateMarksheetStatus,
  getStudentMarksheet,
  validateTargetHash,
  validateMerkleRoot,
  validateSignature,
  checkMerkleRootOnChain
} from "../controllers/marksheetController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import multer from "multer";

// Only allow .txt files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(new Error("Please upload your valid marksheet file."), false);
  }
};

// Set up multer to use memory storage and the file filter
const upload= multer({storage: multer.memoryStorage(), fileFilter});

const router = express.Router();
router
  .route("/")
  .post(protect, createMarksheet)
  .get(protect, getUnCompiledNumber);
router.patch("/compile", protect, admin, compileMarksheet);
router.patch("/update", protect, admin, updateMarksheetStatus);
router.post("/get", getStudentMarksheet);
router.post("/verify/targetHash", upload.single("marksheet"), validateTargetHash);
router.post("/verify/root", validateMerkleRoot);
router.post("/verify/signature", validateSignature);
router.post("/verify/onChain", checkMerkleRootOnChain);


export default router;