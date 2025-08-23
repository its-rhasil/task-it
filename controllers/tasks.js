const Task = require("../models/tasks");
const createTask = async (req,res)=>{
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
       res.status(400).json({success: false, message: error.message}) 
    }
}
const updateTask = async (req, res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id,req.body,{new: true, runValidators: true});
        if(!task){
            return res.status(404).json({message: `File not found at id: ${id}`});
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}
const deleteTask = async (req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
         if(!task){
            return res.status(404).json({message: `No task found at the id: ${id}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
}
const getAllTask = async (req,res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
const getTask = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({msg: `No task with id: ${id}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}
module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getTask
};