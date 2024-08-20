import User from "../models/user.model.js"

export const addPrefferedCategory = async (req,res)=>{
    try {
        const {categoryIds} = req.body
        if(categoryIds.length<1)
            return res.status(400).json({message:"category ids are required"})
        const user = await User.findById(req.user._id);
        if(!user)
            return res.status(404).json({message:"user not found"})
     categoryIds.map((cat)=>user.prefrences.push(cat))
     await user.save()
     return res.status(200).json({message:'added prefrences successfully'})
    } catch (error) {
        console.log(`Error in preffered category controller : ${error.message}`)
        return res.status(500).json({error:"Internal server error"})
    }
}

export const getPrefferedCategories = async (req, res)=>{
try {
    const user = await User.findById(req.user._id);
    if(!user)
        return res.status(404).json({message:"user not found"})
    let prefferedCategories  = await User.findById(user._id)
    .populate({
      path: 'prefrences',
      populate: {
        path: 'books', 
        model: 'Book', 
      },
    })
    .select('prefrences'); 
    prefferedCategories = prefferedCategories.prefrences
    if(!prefferedCategories)
        return res.status(404).json({message:"no prefrences found"})
 return res.status(200).json({prefferedCategories:prefferedCategories})
} catch (error) {
    console.log(`Error in get preffered category controller : ${error.message}`)
    return res.status(500).json({error:"Internal server error"})
}
}