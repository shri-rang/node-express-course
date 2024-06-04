
const express =require('express');
const task = require('./routes/task');


 const app  = express();
 // middleware

  app.use(express.json());

 // Routes
  app.get('/hello', (req,res)=>{
    res.send("Task Maneger App");
  });

  app.use('/api/v1/tasks',  task)
 const port = 3000;

 app.listen(port, console.log(`server is listening ${port}`));



