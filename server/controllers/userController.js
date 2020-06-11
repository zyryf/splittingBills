const Group = require("../models/Group");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            return res.json({ message: err });
        }
    },

    async getUser(req, res) {
        const userID = req.params.userid;
        try {
            const user = await User.findById(userID);
            if (user === null) return res.status(400).json({ title: "User not found" });
            return res.status(200).json({ email: user.email, name: user.name, groups: user.groups });
        } catch (err) {
            return res.status(401).json({ title: "Server Error!", error: err });
        }
    },

    async addUser(req, res) {
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10),
        });

        try {
            await user.save();
            return res.status(201).send({ title: "User Created"});
        } catch (err) {
            return res.status(500).json({ title: "Server error!", error: err });
        }
    },
    async leaveGroup(req,res) {
        const userId = req.params.userid;
        const groupId = req.params.groupid;

        try{
            const user  = await User.findById(userId)
            const group = await Group.findById(groupId)

            if(!user) return res.status(400).json({ title: "User not found" });
            if(!group) return res.status(400).json({title: 'Group not found'});


 
            await user.updateOne({
                 $pull: { groups: group.name } 
            });
            
            await group.updateOne({
                $pull: {members:user.name}
            })

            return res.status(200).json({title: 'You left the group'})

        }catch(err){
            return res.status(500).json({ title: "Server error!", error: err });
        }

    },
    async joinGroup(req,res){

        console.log('okok')

        const userId = req.params.userid;
        const groupId = req.params.groupid;

        try{
            const user  = await User.findById(userId)
            const group = await Group.findById(groupId)

            if(!user) return res.status(400).json({ title: "User not found" });
            if(!group) return res.status(400).json({title: 'Group not found'});

            if(group.members.indexOf(user.name)!==-1)  return res.status(400).json({title:'User already exists in that group'})
 
            await user.updateOne({
                 $push: { groups: group.name } 
            });
            
            await group.updateOne({
                $push: {members:user.name}
            })

            return res.status(200).json({title: 'You have joined the group'})

        }catch(err){
            return res.status(500).json({ title: "Server error!", error: err });
        }
    }

}


