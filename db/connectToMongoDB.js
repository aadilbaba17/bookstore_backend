import mongoose  from "mongoose";

const connectToMongoDB = async ()=>{
    try {

       await  mongoose.connect(process.env.MONGO_DB_URI, {  })
         .catch(function (error) {
             console.log(`Unable to connect to the Mongo db  ${error} `);
         });
        console.log("connected to mongo db")
    } catch (error) {
       console.log(`error connecting to mongoDB ${error.message}`) 
    }
}

export default connectToMongoDB;