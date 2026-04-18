const express=require('express');
const {Port}=require('./config/env.config');
const app=express();
const connectToDatabase=require('./config/db.config');



// Connect to the database
connectToDatabase();



app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})
