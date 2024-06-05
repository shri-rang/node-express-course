 const connectDd =  require('./db/connect');
const express =require('express');
const task = require('./routes/task');
const dotenv = require("dotenv").config();
const notFound = require('./middleware/not-found');
const errHandlerMiddleware = require('./middleware/error-handler')
 connectDd();
 const app  = express();
 // middleware
  app.use(express.static(__dirname+'/public'));
  app.use(express.json());

 // Routes
  app.get('/hello', (req,res)=>{
    res.send("Task Maneger App");
  });

  app.use('/api/v1/tasks',  task)
  app.use(notFound);
  app.use(errHandlerMiddleware)
  
 const port = 3000;

 app.listen(port, console.log(`server is listening ${port}`));



