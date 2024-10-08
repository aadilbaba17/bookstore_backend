import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,

    },
    profilePic:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
      
    },
    prefrences:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:[]
        }
    ],
    prefferedLanguages:[
        {type:String,
            default:[]
            }
    ],
    favorites:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            default:[]
        }],
        bookmarks: [ // New field for bookmarks
            {
                bookId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book",
                    required: true
                },
                pageNumber: {
                    type: Number,
                    required: true
                }
            }
        ]  

});
const User = mongoose.model('User',userSchema);
export default User;