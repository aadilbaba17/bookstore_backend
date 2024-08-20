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
    console.log(req.query,'kkkkkkkkk')
    try {
        const languageFilter = req.query.lang ? { 'books.language': req.query.lang } : {};

        // Use aggregation to filter categories based on books' language
        const categories = await Category.aggregate([
            // Lookup the books collection and join it with the categories
            { $lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            }},
            // Match categories based on the language filter for books
            { $match: languageFilter },
            // Filter out books that do not match the language
            { $addFields: {
                books: {
                    $filter: {
                        input: "$books",
                        as: "book",
                        cond: { $eq: [ "$$book.language", req.query.lang ] }
                    }
                }
            }},
            // Project the fields you want to include in the result
            { $project: {
                name: 1,
                image: 1,
                books: 1 // Include the books field
            }}
        ]);
        if(!categories)
            return req.status(404).json({message:"No categories found"});
        return res.status(200).json({categories:categories});
        
    } catch (error) {
        console.log(`error in getAllCategoryController ${error.message}`)
        return res.status(500).json({error:error.message})
    }
}
