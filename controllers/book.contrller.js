import Book from "../models/books.model.js";
import Category from "../models/categories.model.js";
import User from "../models/user.model.js";

export const addBooks = async (req,res)=>{
    try {
        const {name, image,pdf,language,author,category} = req.body;
        const bookCategory = await Category.findById(category);
         const newBook = new Book({
            name,image,pdf,language,author,category
         })
         bookCategory.books.push(newBook._id)
         await newBook.save();
         await bookCategory.save();
         return res.status(201).json({message:"New book Added"})
    } catch (error) {
       console.log(`Error in add books controller : ${error.message}`)
    return res.status(500).json({error:"Internal server error"})
  
    }
}

export const getAllBooks = async(req,res)=>{
    try {
        const books = await Book.find();
        if(!books)
            return res.status(404).json({message:"NO books found"})
        res.status(200).json({books:books})
    } catch (error) {
        console.log(`Error inget books controller : ${error.message}`)
    return res.status(500).json({error:"Internal server error"})
  
    }
}
export const getBooksBasedOnCategory = async(req,res)=>{
    try {

        const id =req.params.id
        console.log(id)
        const books = await Book.find({category:id});
        if(!books)
            return res.status(404).json({message:"NO books found"})
        res.status(200).json({books:books})
    } catch (error) {
        console.log(`Error inget books controller : ${error.message}`)
    return res.status(500).json({error:"Internal server error"})
  
    }
}
export const getPrefferedBooks = async (req,res)=>{
  
    try {
        const user = await User.findById(req.user._id).select('prefrences');
       const  prefferedCategoryIds = user.prefrences
    
        const books = await Book.find({ category: { $in: prefferedCategoryIds } }).populate('category')
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found for preferred categories" });
        }

        return res.status(200).json({ books:books });
    } catch (error) {
        console.log(`Error in get preffered books controller : ${error.message}`)
        return res.status(500).json({error:"Internal server error"}) 
    }
}