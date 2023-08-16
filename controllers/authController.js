const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;



exports.users = (req, res) => {
    User.find({}).then((data) => {
        res.send("good")
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

exports.login2 = async (req, res) => {
    try {
        const isuser = await User.findOne({ username: req.body.username });
        if (!isuser) {
            return res.status(400).json({ error: "wrong username" });
        }else{
           const isMatch = await bcrypt.compare(req.body.password, isuser.password)
            if (!isMatch) {
                return res.status(400).json({ error: "wrong password" });
            } else if (isMatch) {
                const token = jwt.sign({ id: isuser._id }, process.env.SECRET);
                return res.status(200).json({token});
            }
        }
    }
    catch (err) {
        res.status(500).json({error:"fail"});
    }
}



// const Product = require('../models/Product');

// // Endpoint function for searching products
// exports.searchProducts = async (req, res) => {
//   const searchQuery = req.query.q; // Get the 'q' query parameter from the request
  
//   try {
//     const matchingProducts = await Product.find({ name: { $regex: searchQuery, $options: 'i' } });
//     // Use the $regex operator to perform a case-insensitive search on the 'name' field

//     res.json(matchingProducts);
//   } catch (error) {
//     console.error('Error searching products:', error);
//     res.status(500).json({ message: 'Error searching products' });
//   }
// };


exports.addlist = async (req,res) =>{
    try{
       const patched = await User.findByIdAndUpdate(req.body.id ,req.body)
       res.status(201).json("hey")
    }catch (err){
     res.status(500).json("fuck")
    }
   }

exports.updateuser = async (req,res) =>{
    try{
       const patched = await User.findByIdAndUpdate(req.body.id ,req.body.obj)
       res.status(201).json("sucsess")
    }catch (err){
     res.status(500).json("fail")
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