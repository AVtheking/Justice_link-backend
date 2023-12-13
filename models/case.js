const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
    victimName: {
        type: String,
        required: true,
    },
    oppositionName: {
        type: String,
        required: true,
    
    },
    lastPresentedOn:{
        type:String,
        required:true
    },
    petitioner:{
        type:String,
        required:true
    },
    caseNo:{
        type:String,
        required:true
    },
    respondent:{
        type:String,
        required:true
    },
    petAdvocates:{
        type:String,
        required:true
    },
    caseStatus:{
        type:String,
       
    },
    category:{
        type:String,
        // default:""
    },
    resAdvocates:{
        type:String,
        required:true
    },

})
const Case = new mongoose.model("Case", caseSchema);
module.exports = Case;