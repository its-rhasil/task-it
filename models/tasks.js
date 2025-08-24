const mongoose = require("mongoose");
const {Schema, model} = mongoose;

//Defining the Schema for the task
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
    completed: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true}
);
//Creating and exporting task model
module.exports = model("Task",TaskSchema);