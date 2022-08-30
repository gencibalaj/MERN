const User = require('../models/User');

const todos = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.user.email })
        return res.json({
            success: true,
            todos: user.todo
        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}

const add = async function (req, res) {
    try {
        // const user = await User.findOne({ email: req.user.email })
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $push: { todo: req.params.todo } },
            {
                new: true
            })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        return res.json({
            success: true,
            message: 'ToDo array updated succesfully!',
            user: req.user.email,
            todo: user.todo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}

const update = async function (req, res) {
    try {
        // console.log(req.params.todo);
        // console.log(req.params.newTodo);
        // const user = await User.findOne({ email: req.user.email })
        const user = await User.findOneAndUpdate({ email: req.user.email, todo: { "$in": [req.params.todo] } }, 
        {
            $set: {"todo.$": req.params.newTodo},
        },{new:true}
        )
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found!'
            })
        }
        return res.json({
            success: true,
            message: `Todo "${req.params.todo}" updated to "${req.params.newTodo}" succesfully!`,
            user: req.user.email,
            todo: user.todo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const remove = async function (req, res) {
    try {
        console.log(req.params.todo)
        // const user = await User.findOne({ email: req.user.email })
        const user = await User.findOneAndUpdate({ email: req.user.email, todo: { "$in": [req.params.todo] } }, { $pull: { todo: req.params.todo } }, { new: true })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found!'
            })
        }
        return res.json({
            success: true,
            message: `Todo "${req.params.todo}" removed, array updated succesfully!`,
            user: req.user.email,
            todo: user.todo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}

const mark = async function (req, res) {
    return res.send('hello testing, auth and route is working!')
}
module.exports = {
    todos,
    remove,
    add,
    mark,
    update
}
