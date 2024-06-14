require('dotenv').config();
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
// require('express-async-errors')
// async errors



const express = require('express');
// const notFound = require('./middleware/not-found');

const app = express();


// middleware 
app.use(express.json());



// routes


app.get('/',(req,res)=>{
 res.send('<h1>Store api<h1><a href="/api/v1/products"> products routes </a> ')
});
app.use('/api/v1/products',productsRouter );

 const port =  process.env.PORT || 5000;
 app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async() =>{
    try {
        // connect db
          await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening ${port}`) )
    } catch (error) {
        console.log(error);
    }
}


start()