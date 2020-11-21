const router = require('express').Router() ; 
const User = require('../models/user');
const Skill = require('../models/skill');
const notification = require('../models/notification');


exports.addSkill = async (req,res) =>{
    try {
        
        const skills = req.params.skills; 
        if (!skills){
            return res
            .status(409)
            .json({ message: "SKill  doesn't  exist ! " });
        }
        skills.forEach(async element => {
            const skill = await Skill.create({
                element 
            });
            await skill.save();    
        });

        res.json(skills)
    }
    catch(err){
        res.json({message: err})
    }
}




exports.getSkills = async (req,res) =>{
    try {
        
        const skills = await Skill.find() ;
        res.json(skills)
    }
    catch(err){
        res.json({message: err})
    }
}


exports.deleteSkill = async (req,res) =>{
    try {
        const skill = await Skill.findById(req.params.skillId); 
        
        if (!skill) {
            return res
            .status(409)
            .json({ message: "SKill  doesn't  exist ! " });
        }

        
        // const users = await User.find({
        //     skills : {"$in" : [req.params.skillId]}
        // })

        await User.updateMany(
            {},
            {$pull : { skills : {$in : req.params.skillId } } },
            { multi: true }

        )
        await Skill.deleteOne({
            _id : req.params.skillId
        })

        res.status(200).json({message : 'Successfully deleting Skills '}); 
    }
    catch(err){
        res.json({message: err})
    }



    
}
