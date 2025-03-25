import asyncHandler from "../middleware/asyncHandler.js";
import MARKSHEET from "../models/marksheetModel.js";

// @desc Save new marksheet to the database
// @routes POST /api/marksheet
// @access admin
export const createMarksheet= asyncHandler(async (req, res)=>{
    const {data, targetHash, issuer}= req.body;
    const status= "pending";
    const marksheet= new MARKSHEET({data, targetHash, issuer, status});
    await marksheet.save();
    res.status(201).json({message: "Marksheet created successfully"});
});

// @desc Get marksheet by issuer
// @routes GET /api/marksheet/:issuer
// @access admin
export const getMarksheetByIssuer= asyncHandler(async (req, res)=>{
    const {issuer}= req.params;
    const marksheet= await MARKSHEET.find({issuer});
    res.status(200).json(marksheet);
});