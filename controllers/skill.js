const router = require('express').Router() ; 
const User = require('../models/user');
const Skill = require('../models/skill');
const notification = require('../models/notification');
const skill = require('../models/skill');


exports.addSkill = async (req,res) =>{
    try {
        
        if (req.userData.user.role!='ROLE_ADMIN')
            return res
                .status(401)
                .json({message : 'only admin can add skills '})

        const skills = req.body.skills; 
        if (!skills){
            return res
            .status(409)
            .json({ message: "SKill  doesn't  exist ! " });
        }
        skills.forEach(async element => {
            const addedSkills = await Skill.create({
                name : element 
            });
            await addedSkills.save();    
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
        const skillObject = await Skill.findById(req.params.skillId); 
        
        if (!skillObject) {
            return res
            .status(409)
            .json({ message: "SKill  doesn't  exist ! " });
        }
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
