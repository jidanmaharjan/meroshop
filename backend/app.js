const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/error')

//setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path: 'backend/config/config.env' })
// require('dotenv').config({path: 'backend/config/config.env'})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(fileUpload());

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '../frontend/build/')))
//     app.get((req, res)=>{
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')
//         )
//     })
// }
if(process.env.NODE_ENV === 'PRODUCTION'){
    // app.use(express.static('../frontend/build/'))
    // app.get('*',(req, res)=>{
    //     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')
    //     )
    // })
    app.get('/',(req, res)=>{
        res.send('Welcome to meroshop Api');
    })
}

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)


// Middleware to handle error messages
app.use(errorMiddleware);

module.exports = app