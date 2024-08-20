import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectToMongoDB from './db/connectToMongoDB.js';
import authRouter from './routes/auth.routes.js'
import categoryRouter from './routes/category.rotes.js'
import prefCatRouter from './routes/user.routes.js'
import bookRouter from './routes/book.routes.js'

dotenv.config()
const app = express();
app.use(cors({origin:"*"}))
app.use(cookieParser());
const PORT = process.env.PORT || 5000
//  mongoose.connect(process.env.MONGO_DB_URI, {  })
app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/user',prefCatRouter)
app.use('/api/books',bookRouter)
app.get('/',(req,res)=>console.log('server running'))

app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server running on port ${PORT}`)
})