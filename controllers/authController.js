const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;



exports.users = (req, res) => {
    User.find({}).then((data) => {
        res.send(data)
    })
}

exports.register = async (req, res) => {
    try {
        hashedpassword = await bcrypt.hash(req.body.password, saltRound)
        const newuser = await User.create({ username: req.body.username, email: req.body.email, password: hashedpassword ,personinfo:req.body.personinfo})
        res.status(200).json('user has been successfully added')
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.login = async (req, res) => {
    try {
        const isuser = await User.findOne({ email: req.body.email });
        if (!isuser) {
            return res.status(400).json({ error: "wrong email" });
        }else{
           const isMatch = await bcrypt.compare(req.body.password, isuser.password)
            if (!isMatch) {
                return res.status(400).json({ error: "wrong password" });
            } else if (isMatch) {
                const token = jwt.sign({ id: isuser._id }, process.env.SECRET);
                console.log(token);
                return res.status(200).json({token} );
            }
        }
    }
    catch (err) {
        res.status(500).json({error:"shit"});
    }
}


exports.addlist = async (req,res) =>{
    try{
       const patched = await User.findByIdAndUpdate(req.body.id ,req.body)
       res.status(201).json("hey")
    }catch (err){
     res.status(500).json("fuck")
    }
   }
   

   
exports.deletepost = async (req, res) => {
    try {
        const patched = await User.findByIdAndUpdate(req.body.id ,req.body)
        res.status(200).json("seccses");
    } catch (err) {
        res.status(500).json(err.message);
    }

}

exports.isusers = async (req, res) => {
    try {
        const isuser = await User.find({ email: req.body.email })
        console.log(isuser);
        if (isuser == undefined) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (err) {
        res.status(500).json('errors')
    }
}

exports.istoken = async (req, res) => {
    try {
        const newid = jwt.verify(req.body.token, process.env.SECRET)
        const isuser = await User.findOne({ _id: newid.id })
        console.log(isuser);
        if (!isuser) {
            return res.status(400).json('errors')
        }
        return res.status(201).send(isuser)

    } catch (err) {
        res.status(500).json('errors')
    }


}