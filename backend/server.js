const app = require ('./app')
const connectDatabase = require('./config/database')

// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(('Shutting down server due to uncaught exceptions'));
    process.exit(1);
})

//setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION')require('dotenv').config({path: 'backend/config/config.env' })
// require('dotenv').config({path: 'backend/config/config.env'})

//connecting to database
connectDatabase();

//Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Server started on PORT : ${process.env.PORT || 4000} in ${process.env.NODE_ENV} mode.`);
})

// Handle unhandled promise rejections
process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejections');
    server.close(()=>{
        process.exit(1);
    })
})