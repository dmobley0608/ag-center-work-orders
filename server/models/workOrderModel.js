const { default: mongoose, Schema } = require("mongoose");

const commentSchema = new Schema({body:String, date:{type:Date, default:Date.now()}})

const schema = new mongoose.Schema({
    createdAt: {type: Date, default:Date.now()},
    createdBy:{type:String, default: null},
    completedAt: {type:Date, default:null},
    completedBy:{type:String, default:null},
    details: {type:String, default:null},
    completed: {type:Boolean, default:false},
    imageUrl: {type:String, default:null},
    imageId:{type:String, default:null},
    comments:[commentSchema],
    finalized:{type:Boolean, default:false}
})

const WorkOrder = mongoose.model('WorkOrder', schema)

module.exports = WorkOrder

