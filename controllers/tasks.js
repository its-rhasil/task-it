const Task = require("../models/tasks");
const asyncWrap = require("../middleware/async");
const {createCustomError} = require("../errors/error");

//Controller for creating task
const createTask = asyncWrap(async (req,res)=>{
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
})
//Controller for updating task
const updateTask = asyncWrap(async (req, res)=>{
    const {id} = req.params;
    const task = await Task.findByIdAndUpdate(id,req.body,{new: true, runValidators: true});
    if(!task){
        throw new createCustomError(`No Task found with id: ${id}`,404);
    }
    res.status(200).json({ task });
})
//Controller for deleting tasks
const deleteTask = asyncWrap(async (req,res)=>{
    const {id} = req.params;
    const task = await Task.findByIdAndDelete(id);
    if(!task){
        throw new createCustomError(`No task found with id: ${id}`,404);
    }
    res.status(200).json({task});
});
//Controller for retrieving all tasks
const getAllTask = async (req,res)=>{
    const tasks = await Task.find();
    if(tasks.length === 0){
        res.status(200).json({message: "No Task available!"});
    }
    res.status(200).json({tasks});
}
//Controller for retrieving specific task
const getTask = async (req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task){
        throw new createCustomError(`No task found with id: ${id}`,404);
    }
    res.status(200).json({task});
}
module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getTask
};