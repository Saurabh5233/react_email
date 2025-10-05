const express = require('express');
const cors  = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Email = require('./Models/EmailSchema.js');

// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
dotenv.config();


const app = express()
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
  })

app.post('/send-email',async(req, res)=>{
    const {name, email, message} = req.body;
    if(!name || !email ||!message)return res.status(400).json({message: "All fields are required..."})
    
    try{
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user: process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            }
        });
        
        
        await transporter.sendMail({
            from : `"${name}" <${process.env.EMAIL_USER}>`,
            to : email,
            subject : "Message from Email App",
            text : message,
        });

        await Email.create({name, email, message});

        res.json({message: "Email sent Successfully!"})

    }catch (error){
        console.log(error);
        res.status(500).json({message: "Failed to send email."});
    }

});

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})