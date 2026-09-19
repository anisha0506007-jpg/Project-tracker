import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Progress from "./models/Progress.js";

dotenv.config();

const PORT=process.env.PORT 

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error)=>{
    console.log("MongoDB unable to connect due to error: ",error)
})

app.post("/progress", async (req, res) => {

    try {

        const progress = new Progress(req.body);
        const savedProgress = await progress.save();

        res.status(201).json({
            message: "Progress added successfully",
            data: savedProgress
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to add progress",
            error: error.message
        });

    }

});


app.get("/progress", async (req, res) => {

    try {

        const progress = await Progress.find();
        res.status(200).json(progress);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get progress",
            error: error.message
        });

    }

});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
