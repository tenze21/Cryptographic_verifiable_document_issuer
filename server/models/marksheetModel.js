import mongoose from "mongoose";

const marksheetSchema= new mongoose.Schema({
    data:{
        student:{
            indexNo:{
                type: String,
                required:[true, "Index number cannot be empty"],
                unique: true,
                trim: true 
            },
            name:{
                type: String,
                required: [true, "Student name cannot be empty"],
            },
            dob:{
                type: String,
                required: [true, "Date of birth cannot be empty"],
            },
            school:{
                type: String,
                required: [true, "School name cannot be empty"],
            }
        },
        subjects:[
            {
                name:{
                    type: String,
                    required: [true, "Subject name cannot be empty"],
                },
                marks:{
                    type: String,
                    required: [true, "Marks cannot be empty"],
                }
            }
        ],
        supw:{
            type: String,
            required: [true, "SUPW grade cannot be empty"],
        },
        result:{
            type: String,
            required: [true, "Result cannot be empty"],
        },
    },
    targetHash:{
        type: String,
        required: [true, "Target hash cannot be empty"],
    },
    proof:[], //Array of strings
    merkleRoot:{
        type: String,
    },
    signature:{
        type: String,
    },
    status:{
        type: String,
        required: [true, "Status cannot be empty"],
        enum: ["pending", "issued"],
        default: "pending"
    }
},
{
    timestamps: true,
}
);

const MARKSHEET= mongoose.model('Marksheet', marksheetSchema);
export default MARKSHEET;