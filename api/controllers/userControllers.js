const User = require("../../models").User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/keys');

signToken = user => {
  return jwt.sign(
    {
      iss: "foodfun",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};
exports.create_user = async (req, res, next)=> {
   try {
         const hashPassword = await bcrypt.hash(req.body.password, 10);
         const newUser = {
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           email: req.body.email,
           password: hashPassword
         };
         console.log(newUser);
        const user = await User.findOne({
         where: {
           email: req.body.email
         }
       });
       if(user){
           res.status(401).json({
               message:"Email already exists."
           })
       }
       await User.create(newUser);
       const token = await signToken(newUser);
        res.status(200).json({
           token
      })
       } catch (err) {
       throw err;
       res.status(200).json({
           message: 'Something went wrong'
       })
   }
}

exports.user_signin = async (req, res, next) => {
  try{
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      console.log(user)
      if(user.length < 1){
          return res.status(401).json({
              message: 'Auth failed'
          })
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if(!isMatch){
          return res.status(401).json({
            message: "Wrong password"
      });
      }
      const token = signToken(user);
      res.status(200).json({ token });
  }catch(err){
      throw err;
      res.status(200).json({
        message: "Something went wrong"
      });
  }
};

exports.reset_password = async(req, res, next) => {
  try {
      const user = await User.findOne({
         where: {
           email: req.body.email
         }
       });
       if(!user){
         return res.status(401).json({
           message:"Auth failed"
         });
       }
       const hashPassword = await bcrypt.hash(req.body.password, 10);
       const result = await user.update({
         password : hashPassword
       });

       res.status(200).json({
         message:"Document updated sucessfully",
         result
       });
  } catch (error) {
    throw err;
  }
}

exports.googleOauth = async (req, res, next) => {
  const token = signToken(req.user);
  console.log(req.user);
  res.status(200).json({ token });
};

exports.facebookOauth = async (req, res, next) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
};