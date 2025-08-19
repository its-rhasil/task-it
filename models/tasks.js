const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["to-do","in-progress","completed"],
        default: "to-do"
    }
}, {timestamps: true}
);

module.exports = model("Task",TaskSchema);