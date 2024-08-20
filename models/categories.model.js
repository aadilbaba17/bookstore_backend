import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    image:{
        required:true,
        type:String
    },
    books:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            default:[]
        }]    

},{timestamps:true})
const Category = mongoose.model('Category',categorySchema);

export default Category;