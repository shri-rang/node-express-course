const express = require('express')
const { 
    getAlljobs,
    getJob, 
    createJob,
    updateJob,
    deleteJob} = require('../controllers/jobs')


const router = express.Router();

  
  
  router.route('/').get(getAlljobs).post(createJob)
  router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)





module.exports = router