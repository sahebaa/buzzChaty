import Users from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../mailSenderFiles/nodeMailerTransport.js";
import dotenv from 'dotenv'
dotenv.config();

const saltRounds = parseInt(process.env.SALT, 10);
const JWT_SECRET=process.env.JWT_SECRET

console.log(saltRounds);

const signIn=async(req,res)=>{
    console.log("route successfully hited")
    try{
        const {name,lastName,email,password,colorCode,profileImg,bio,dateOfBirth}=req.body;
       
    const user=await Users.findOne({email});

    //console.log(user);
    
    if(user)
        return res.status(403).json({"message":"either eamil or password wrong"});

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser=new Users({
        name,
        lastName,
        email,
        password:hashedPassword,
        colorCode,profileImg,
        bio,dateOfBirth
    });

    const savedUser=await newUser.save();

    if(!savedUser)
        return res.status(500).json({"message":"Internal server error"});

    const token = jwt.sign(
        { id: savedUser.id, username: savedUser.email },
        JWT_SECRET,  // Use a strong secret key from .env
        { expiresIn: '1h' }       // Optional: token expiration
      );

      const verificationLink=`${process.env.EMAIL_URL}/:token=${token}`;
      const mailRes=await sendMail(newUser.email,verificationLink);

      console.log("Here is mail res",mailRes);

      if(mailRes)
        return res.status(200).json({"message":"User regestraion sucessful check your email"});
      else
      return res.status(500).json({"message":"Internal server error"});
    }catch(err){
        console.log("error occured on sign up controller",err);
        return res.status(501).json({"message":"error occured"});
    }

}   


const login=async(req,res)=>{
   try{
    const {email,password}=req.body;

    const user=await Users.findOne({email});

    if(!user)
        return res.status(400).json({"message":"either user or password wrong"});

   //console.log("Here is your user ",user);

    const isMatch = await bcrypt.compare(password, user.password); 
   
    if(!isMatch)
        return res.status(400).json({"message":"either user or password wrong"});

    const authToken = jwt.sign({ id: user._id,userEmail:user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token',authToken,{
        httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        userId:user._id,
        name:user.name,
        lastName:user.lastName,
        colorCode:user.colorCode,
        profileImg:user.profileImg,
        bio:user.bio,
        email:user.email,
    })
   }catch(err){
    console.log("error on controller ",err);
    res.status(501).send("Internal server Error");
   }


}

const verifyEmail=async(req,res)=>{
    try{
        const token=req.query.token;

        const payload=jwt.verify(token,process.env.JWT_SECRET);
        console.log("this is your payload",payload);

        const user=await Users.findById(payload.id);

        if(!user)
            return res.status(404).send("user not found");

        if(user.isVerified)
            return res.status(400).send("email already verified");

        user.isVerified=true;
        await user.save();

        const authToken = jwt.sign({ id: user._id,userEmail:user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token',authToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            userId:user._id,
            name:user.name,
            lastName:user.lastName,
            colorCode:user.colorCode,
            profileImg:user.profileImg,
            bio:user.bio,
            email:user.email,
        })


    }catch(err){
        return res.status(400).send('Invalid or expired verification link');
    }
}

const about=async(req,res)=>{
    return res.status(201).json({"message":"you are on the right route"})
};

export {
    signIn,
    login,
    verifyEmail,
    about
};
