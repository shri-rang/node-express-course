const getAllTasks = (req, res)=>{
 res.send('All Items from file');
}

const createTask = (req, res)=>{
 res.json(req.body);
}

const getTask = (req, res)=>{
 res.json({id:req.params.id});
}


const upadteTask = (req, res)=>{
 res.send('Upadte dfssdf task');
}


const deleteTask = (req, res)=>{
 res.send('Delete task');
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    upadteTask,
    deleteTask
    
}