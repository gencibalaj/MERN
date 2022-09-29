const User = require('../models/User');
const Task = require('../models/Task')
const Team = require('../models/Team')
// const userService = require('../services/userService')
// const todoService = require('../services/todoService')
const isLeader = require('../services/isLeader')


const tasks = async function (req, res) {
    try {
        const tasks = await Task.find({ employees: { "$in": [req.user._id] } })
        return res.json({
            success: true,
            tasks: tasks
        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const assignTasks = async function (req, res) {
    
    const leader = await isLeader(req.body.team, req.user._id)
    if (!leader) {
        return res.status(401).json({
            success: true,
            message: "Unathorized"
        })
    }

    const exists = await Task.findOne({name:req.body.name, team: req.body.team})
    if(exists){
        return res.status(400).json({
            success: false,
            message: "This task exists!"
        })
    }

    try {
        const newTask = new Task({
            name: req.body.name,
            team: req.body.team,
            employees: req.body.employees,
            leader: req.user._id,
            assigned_date: req.body.assigned_date || Date.now(),
            deadline: req.body.deadline,
            done: req.body.done || null
        })
        const task = await newTask.save()
        return res.status(201).json({
            success: true,
            message: `Task registered succesfuly!`,
            task: task.name
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const deleteTasks = async function (req, res) {
    // console.log(req.params.taskName, req.user._id)
    const taskInfo = await Task.findOne({name: req.params.taskName})
   
    if(!taskInfo){
        return res.status(404).json({
            success:false,
            message: "Task not found!"
        })
    }
    
    if (req.user._id !== taskInfo.leader.toString()) {
        return res.status(401).json({
            success: true,
            message: "Unauthorized"
        })
    }
    try {
        await Task.deleteMany({name:req.params.taskName, leader: req.user._id})
        return res.status(201).json({
            success: true,
            message: `Task deleted succesfuly!`,

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


module.exports = {
    tasks,
    assignTasks,
    deleteTasks
}
