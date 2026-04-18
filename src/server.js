const express=require('express');
const {Port}=require('./config/env.config');
const app=express();
const connectToDatabase=require('./config/db.config');



// Connect to the database
connectToDatabase();
app.use(express.json());


// Define routes
const userRoutes=require('./routes/auth.routes');
app.use('/api/auth',userRoutes);


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})
