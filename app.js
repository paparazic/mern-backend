

import express from "express";
import { config } from "dotenv";
import userRoutes from './routes/userRoutes.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from 'path';


config()

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/users', userRoutes);





if(process.env.NODE_ENV = 'production') {
    const __dirname = path.resolve('../');
    console.log('путь', path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get('*', (req, res) => {
        console.log('вход')
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    }
    
    )
} else {
    app.get('*', (req, res) => 
    res.send('API is running'))
}

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(process.argv)
    console.log(`Server starts at port ${PORT}`)
})