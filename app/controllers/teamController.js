const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const Team = require('../models/Team');
const User = require('../models/User');
const isLeader = require('../services/isLeader')

const get = async function (req, res) {
    try {
        const teams = await Team.find()
        return res.json({
            success: true,
            teams: teams
        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const addTeam = async function (req, res) {
    if (req.user.role !== "HR") {
        return res.status(401).json({
            success: false,
            message: "Unauthorized to delete Teams"
        })
    }
    let name = req.params.name
    name = name.toUpperCase()
    const leader = req.params.leaderID

    const team = await Team.findOne({ name: name })
    if (team) {
        return res.status(404).json({
            success: false,
            message: "Team already exists!"
        })
    }

    try {
        const objTeam = {
            name,
            leader
        }
        new Team(objTeam).save()

        return res.json({
            success: true,
            message: 'New team registered!',
            team: name,
            leader: leader
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const deleteTeam = async function (req, res) {
    try {
        if (req.user.role !== "HR") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized to delete Teams"
            })
        }

        const team = await Team.findOneAndRemove({ name: req.params.name })
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found!'
            })
        }
        return res.json({
            success: true,
            message: `Team "${req.params.name}" deleted!`,
            team: req.params.name,
            leader: team.leader
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const addMembers = async function (req, res) {
    //middleware a osht leader
    const teamName = req.params.name
    const _id = req.params.memberID


    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({
            success: false,
            message: "ID is not valid"
        })
    }
    const leader = await isLeader(teamName,req.user._id)
    try {
        if(!leader && req.user.role !== "HR"){
            return res.status(401).json({
                success: true,
                message: "Unathorized request"
            })
        }

       const teamInfo = await Team.findOne({name:teamName})
        if(teamInfo.members.indexOf(_id)!==-1){
            return res.status(401).json({
                success: false,
                message: 'Member exists!'
            })
        }

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Member should be a user!"
            })
        }

        const team = await Team.findOneAndUpdate(
            { name: teamName },
            { $push: { members: _id } },
            {
                new: true
            })

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found!"
            })
        }

        return res.json({
            success: true,
            message: 'User added to the team!',
            team: teamName,
            member: _id
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const removeMember = async function (req, res) {
    try {
        const teamInfo = await Team.findOne({ name: req.params.name })
        const teamLeaderId = teamInfo.leader.toString()

        //req.user.role !== "LEADER" || 
        if (req.user._id !== teamLeaderId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request!'
            })
        }
        const team = await Team.updateOne({ name: req.params.name }, { $pull: { members: req.params.memberId } })
        // console.log(team)
        if (!team || team.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Team or member not found!'
            })
        }
        return res.json({
            success: true,
            message: `Member "${req.params.memberId}" removed!`,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}


const assignLeader = async function (req, res) {
    if (req.user.role !== "HR") {
        return res.status(401).json({
            success: false,
            message: "Unauthorized to assign Team Leader"
        })
    }

    const leaderToBe = req.params.userId
    const teamToSetLeader = req.params.name

    try {
        const team = await Team.findOneAndUpdate({ name: teamToSetLeader }, { $set: { "leader": leaderToBe } })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wrong happened!"
        })
    }
}

//user does not have access to teams and tasks related to other employees
//leaders can add members to the team they are admin of
//leaders can not create teams
//teams are created and deleted by HR

module.exports = {
    get,
    addTeam,
    deleteTeam,
    addMembers,
    removeMember,
    assignLeader
}
