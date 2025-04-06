import asyncHandler from "../middleware/asyncHandler.js";
import MARKSHEET from "../models/marksheetModel.js";
import { wrapDocument, generateRoot } from "../utils/wrap.js";

// @desc Save new marksheet to the database
// @routes POST /api/marksheet
// @access admin
export const createMarksheet= asyncHandler(async (req, res)=>{
    // const body= JSON.stringify(req.body, null, 2);
    const wrappedDocument=wrapDocument(req.body);
    // console.log(JSON.stringify(wrappedDocument, null, 2));
    
    const marksheet= new MARKSHEET({data: wrappedDocument.data, targetHash: wrappedDocument.targetHash});
    await marksheet.save();
    res.status(201).json({message: "Marksheet details saved successfully"});
});

// @desc get number of unCompiled marksheets
// @routes GET /api/marksheet
// @access admin
export const getUnCompiledNumber= asyncHandler(async (req, res)=>{
    const marksheets= await MARKSHEET.find({status: "pending"});
    res.status(200).json({num: marksheets.length});
});

// @desc get number of unCompiled marksheets
// @routes PATCH /api/marksheet/compile
// @access admin
export const compileMarksheet= asyncHandler(async (req, res)=>{
    const marksheets= await MARKSHEET.find({status: "pending"});
    if(marksheets.length===0){
        throw new Error("No marksheets to be issued.");
    }
    const plainMarksheets= marksheets.map((marksheet)=>marksheet.toObject());
    
    const wrappedDocuments= generateRoot(plainMarksheets);
    await MARKSHEET.deleteMany({status: "pending"});
    await MARKSHEET.insertMany(wrappedDocuments);
    res.status(200).json({MerkleRoot: wrappedDocuments[0].merkleRoot});
});