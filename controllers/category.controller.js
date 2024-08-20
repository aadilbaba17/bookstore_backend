import Category from "../models/categories.model.js";

export const addCategory = async(req,res)=>{
    try {
        const{name,image} =req.body;
        if(!name || !image){
            return res.status(400).json({message:"please provide all fields"})
        }
        const existingCat = await Category.findOne({name});
        if(existingCat){
            return res.status(400).json({message:"Category already exists"})
        }
        const newCat =  new Category({
            name,
            image
        })
        await newCat.save();
        return res.status(201).json({message:"new category added"})

    } catch (error) {
        console.log(`error in addcategoryController ${error.message}`)
        return res.status(500).json({error:error.message})
    }
}

export const getAllCategories = async (req,res)=>{
    try {
        const categories = await Category.find().populate('books')
        if(!categories)
            return req.status(404).json({message:"No categories found"});
        return res.status(200).json({categories:categories});
        
    } catch (error) {
        console.log(`error in getAllCategoryController ${error.message}`)
        return res.status(500).json({error:error.message})
    }
}