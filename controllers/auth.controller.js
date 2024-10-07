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

export const googleSignIn = async (req, res) => {
    try {
      const { email, fullName, profilePic } = req.body; // Extract the necessary user data
  
      // Check if the user already exists
      let user = await User.findOne({ email });
  
      if (!user) {
        // Create a new user if they don't exist
        const newUser = new User({
          email,
          fullName,
          username: email.split('@')[0], // Create a username from email
          profilePic,
          // You can set a default password or leave it undefined
          password: "google", // Google users usually don't have passwords
        });
  
        await newUser.save();
        user = newUser; // Set user to the newly created user
      }
  
      // Generate token and set it as a cookie
      const token = generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      console.log(`Error in Google Sign-In controller: ${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };