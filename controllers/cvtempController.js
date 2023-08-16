const Cvtemp = require('../models/cvtemp');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;

exports.createcv = async (req, res) => {
    try {
        const newcv = await Cvtemp.create(req.body)
        const isuser = await User.findByIdAndUpdate(req.body.id,{$push:{personinfo:{_id:newcv._id}}});
        if (!isuser) {
          return res.status(400).send("not goood");
        }
        res.status(200).json('id added')
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.patchcv = async (req, res) => {
    console.log(req.body.id);
    try {
        const newcv = await Cvtemp.findByIdAndUpdate(req.body.id,req.body)
        console.log(req.body.fullname);
        if (!newcv) {
          return res.status(400).send("not");
        }
        res.status(200).json('id added')
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.findcv = async (req,res) =>{
   try{
    const isuser = await User.findOne({ _id: req.body.id }).populate('personinfo')
    console.log(isuser);
    if (!isuser) {
        return res.status(400).send("dont have");
    }
    res.status(200).json(isuser)
   }catch(err){
    res.status(500).send(err);
   }
}


exports.deletecv = async (req,res) =>{
   try{
    const deletecv = Cvtemp.findByIdAndDelete(req.body.cvid) 
    const isuser = await User.findByIdAndUpdate({ _id: req.body.userid },
      {
        $pull : {personinfo : { $in : req.body.cvid }}
      },  
      {new:true}   
        )
    res.status(200).json(isuser)
   }catch(err){
    res.status(500).send(err);
   }
}

