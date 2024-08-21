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

export const getAllCategories = async (req, res) => {
    try {
        const languageFilter = req.query.lang ? { 'books.language': req.query.lang } : {};

        // Use aggregation to filter categories based on books' language
        const categories = await Category.aggregate([
            // Lookup the books collection and join it with the categories
            {
                $lookup: {
                    from: 'books',
                    localField: 'books',
                    foreignField: '_id',
                    as: 'books'
                }
            },
            // Conditionally match categories based on the language filter for books
            {
                $addFields: {
                    books: {
                        $cond: {
                            if: { $gt: [ { $size: [ "$books" ] }, 0 ] },
                            then: {
                                $filter: {
                                    input: "$books",
                                    as: "book",
                                    cond: languageFilter['books.language'] ? { $eq: [ "$$book.language", req.query.lang ] } : { $ne: [ "$$book.language", null ] }
                                }
                            },
                            else: "$books"
                        }
                    }
                }
            },
            // Project the fields you want to include in the result
            {
                $project: {
                    name: 1,
                    image: 1,
                    books: 1 // Include the books field
                }
            }
        ]);

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        return res.status(200).json({ categories });
        
    } catch (error) {
        console.log(`Error in getAllCategoryController: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}

