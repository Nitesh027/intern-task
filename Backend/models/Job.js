import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true, trim: true},
    
    jobDescription: { type: String, required: true, trim: true
    },
    lastDate: {type: Date,required: true
    },
    companyName: { type: String, required: true, trim: true
    },
    status: { type: String,  enum: ["Active", "Inactive"], default: "Active"
    },
    user: {type: Schema.Types.ObjectId,ref: 'User',required: true
    },
    created_at: {type: Date, default: Date.now
    },
    updated_at: {type: Date, default: Date.now
    }
});

const Job = mongoose.model("Job", jobSchema);
export default Job;