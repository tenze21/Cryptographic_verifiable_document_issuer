import asyncHandler from "../middleware/asyncHandler.js";
import MARKSHEET from "../models/marksheetModel.js";
import { wrapDocument, generateRoot } from "../utils/wrap.js";
import { unSaltData } from "../utils/salt.js";
import { digestDocument, validateJsonSchema } from "../utils/wrap.js";
import { checkProof } from "../utils/merkle.js";
import { encrypt, decrypt } from "../utils/encrypt.js";
import { hashMessage, recoverAddress, hexToBytes } from "viem";
import {abi} from "../contractAbi/abi.js";
import { publicClient } from "../viemClient.js";

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

// @desc Recompute target hash
// @routes Get /api/marksheet/verify/targetHash
// @access public
export const validateTargetHash = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error("Please upload a file.");
  }
  // Get the file content
  const fileContent = file.buffer.toString("utf-8");

  // decrypt the file content
  const decryptedData = decrypt(fileContent);
  const marksheetData = JSON.parse(decryptedData);

  // validate if the document is a valid JSON schema
  const validationResult = validateJsonSchema(marksheetData);
  if (!validationResult.isValid) {
    throw new Error("Invalid document: " + validationResult.errors[0].message);
  }

  const recomputedTargetHash = digestDocument({ data: marksheetData.data });

  const dataToBeUnsalted = { data: marksheetData.data };
  const unsaltedData = unSaltData(dataToBeUnsalted);


  // compare the recomputed target hash with the original target hash
  const isMatch = recomputedTargetHash === marksheetData.targetHash;
  if(!isMatch){
    res.status(400);
    throw new Error("Document has been tampered: document hash does not match.");
  }

  res.status(200).json({ message: "Document hash successfully validated", data: {...marksheetData, data: unsaltedData.data}});
});

// @desc Validate merkle root
// @routes Get /api/marksheet/verify/root
// @access public
export const validateMerkleRoot = asyncHandler(async (req, res) => {
  const { proof, root, targetHash } = req.body;
  const isValidProof = checkProof(proof, root, targetHash);
  if(!isValidProof) {
    res.status(400);
    throw new Error("Document has been tampered: Merkle proof is invalid.");
  }
  res.status(200).json({ message: "Merkle root successfully validated" });
});

// @desc Validate signature
// @routes Get /api/marksheet/verify/signature
// @access public
export const validateSignature = asyncHandler(async (req, res) => {
  const { merkleRoot, signature } = req.body;
  const rootHash = hashMessage(merkleRoot);
  const signerAddress = await recoverAddress({ hash: rootHash, signature });
  const isValidSignature = signerAddress === process.env.ADMIN_ADDRESS;
  if(!isValidSignature) {
    res.status(400);
    throw new Error("Document has been tampered: Signature is invalid.");
  }
  res.status(200).json({ message: "Signature validation successful" });
});

// @desc Check merkle root onchain
// @routes Get /api/marksheet/verify/onchain
// @access public
export const checkMerkleRootOnChain = asyncHandler(async (req, res) => {
  const { merkleRoot } = req.body;
  // const byteRoot= hexToBytes(merkleRoot);
  const data = await publicClient.readContract({
    address: process.env.CONTRACT_ADDRESS,
    abi: abi,
    functionName: "verifyDocument",
    args: [`0x${merkleRoot}`],
  });
  if (!data) {
    res.status(404);
    throw new Error("Document has not been issued, hash not found on chain.");
  }
  res.status(200).json({ message: "Root on chain" });
});