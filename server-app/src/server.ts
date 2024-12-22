import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDb();

const port=process.env.PORT || 5001
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {
        origin:"https://url-shortener-frontend-sable.vercel.app",
        credentials:true,
    }
));

app.get("/",(req,res)=>{
    res.send("hello,world");
});

app.use("/api/",shortUrl);

app.listen(port,()=>{
    console.log(`Server sucessfully running on port ${port}`)
});