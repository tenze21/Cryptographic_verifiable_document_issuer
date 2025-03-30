import asyncHandler from "../middleware/asyncHandler.js";
import MARKSHEET from "../models/marksheetModel.js";
import { wrapDocument } from "../utils/wrap.js";

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