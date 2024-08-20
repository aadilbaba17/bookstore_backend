import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup= async(req,res) => {
    try {
        const {fullName,username,password,confirmPassword,email} =req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords don't match"})
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({error:"user already exits"})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        email,
        fullName,
        username,
        password:  hashedPassword,
        profilePic:  boyProfilePic
    })
    if(newUser)
   {
    const token = generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();
    return res.status(201).json({token: token,user:newUser
    })}
    else{
        return res.status(400).json({error:"Invalid user data"})
    }
    } catch (error) {
        console.log(`Error in signup controller : ${error.message}`)
        return res.status(500).json({error:"Internal server error"})
    }
    
}
export const login= async (req,res) => {
    try {
        const {email,password} =req.body; 
        const user = await User.findOne({email});
      
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");
        if(!user && !isPasswordCorrect){
          return  res.status(400).json({error:"Invalid user credentials"})
        }
     const token=    generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            token:token, user:user
        })
        
    } catch (error) {
        console.log(`Error in login controller : ${error.message}`)
        return res.status(500).json({error:"Internal server error"})
    }

}

export const logout= (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log(`Error in logout controller : ${error.message}`)
        return res.status(500).json({error:"Internal server error"})
    }

}