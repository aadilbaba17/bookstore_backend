import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
name:{
    type:String,
    required :true
},
author:{
    type:String,
},
image:{
type:String,
required:true
},
pdf:{
    type:String,
    required:true
},
language:{
    type:String,
    required:true
},
category:{
    type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
}

},{timestamps:true})

const Book = mongoose.model('Book',booksSchema)

export default Book;