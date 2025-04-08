import asyncHandler from "../middleware/asyncHandler.js";
import MARKSHEET from "../models/marksheetModel.js";
import { wrapDocument, generateRoot } from "../utils/wrap.js";
import { unSaltData } from "../utils/salt.js";
import { encrypt, decrypt } from "../utils/encrypt.js";

// @desc Save new marksheet to the database
// @routes POST /api/marksheet
// @access admin
export const createMarksheet = asyncHandler(async (req, res) => {
  // const body= JSON.stringify(req.body, null, 2);
  const wrappedDocument = wrapDocument(req.body);
  // console.log(JSON.stringify(wrappedDocument, null, 2));

  const marksheet = new MARKSHEET({
    data: wrappedDocument.data,
    targetHash: wrappedDocument.targetHash,
  });
  await marksheet.save();
  res.status(201).json({ message: "Marksheet details saved successfully" });
});

// @desc get number of unCompiled marksheets
// @routes GET /api/marksheet
// @access admin
export const getUnCompiledNumber = asyncHandler(async (req, res) => {
  const marksheets = await MARKSHEET.find({ status: "pending" });
  res.status(200).json({ num: marksheets.length });
});

// @desc Generate merkle root and add the proof and root to the marksheet
// @routes PATCH /api/marksheet/compile
// @access admin
export const compileMarksheet = asyncHandler(async (req, res) => {
  const marksheets = await MARKSHEET.find({ status: "pending" });
  if (marksheets.length === 0) {
    throw new Error("No marksheets to be issued.");
  }
  /** 
 If pending marksheet already has merkle root skip merkle root generation and 
 directly send the merkle root.
 case may occur when transaction fails in the frontend.
**/
  if (marksheets[0].merkleRoot) {
    res.status(200).json({ MerkleRoot: marksheets[0].merkleRoot });
  } else {
    const plainMarksheets = marksheets.map((marksheet) => marksheet.toObject());

    const wrappedDocuments = generateRoot(plainMarksheets);
    await MARKSHEET.deleteMany({ status: "pending" });
    await MARKSHEET.insertMany(wrappedDocuments);
    res.status(200).json({ MerkleRoot: wrappedDocuments[0].merkleRoot });
  }
});

// @desc Update marksheet status to issued
// @routes PATCH /api/marksheet/update
// @access admin
export const updateMarksheetStatus = asyncHandler(async (req, res) => {
  const { signature } = req.body;
  await MARKSHEET.updateMany(
    { status: "pending" },
    { $set: { status: "issued", signature: signature } }
  );
  res.status(200).json({ message: "Marksheets have been issued." });
});

// @desc get student marksheet
// @routes Get /api/marksheet/get?indexNo=<index number>&dob=<dob>
// @access public
export const getStudentMarksheet = asyncHandler(async (req, res) => {
  const { indexNo, dob } = req.query;
  const marksheet = await MARKSHEET.findOne({
    "data.student.indexNo": { $regex: `:${indexNo}$` },
    "data.student.dob": { $regex: `:${dob}$` },
  }).lean();
  if (!marksheet) {
    res.status(404);
    throw new Error("Marksheet not found");
  } else {
    marksheet.data.subjects.map((subject) => {
      delete subject._id;
    });
    delete marksheet.__v;

    // encrypt marksheet
    let encryptedMarksheet = encrypt(marksheet);
    const dataToBeUnsalted = { data: { ...marksheet.data } };
    const unsaltedData = unSaltData(dataToBeUnsalted);
    res.status(200).json({ marksheet: encryptedMarksheet, unsaltedData });
  }
});