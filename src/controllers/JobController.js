const Job = require('../models/Job')
const Profile = require('../models/Profile')
const Utils = require('../utils/JobUtils')

module.exports = {
  
  open: (req, res) => {
    return res.render("job")
  },

  create: async (req, res) => {
    const jobs = await Job.get()
    
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() 
    })
    
    return res.redirect('/')
  },

  show: async (req, res) => {
    const jobs = await Job.get()
    const profile = await Profile.get()

    const idJob = req.params.id
    const job = jobs.find(job => Number(job.id) === Number(idJob))
 
    if (!job) {
      return res.redirect('/')
    }

    job.budget = Utils.calculateBudget(job, profile["value-hour"])

    res.render("job-edit", { job })
  },

  update: async (req, res) => {
    const idJob = req.params.id
 
    const updateJob = {
      id: idJob,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    await Job.update(updateJob)

    res.redirect('/')
  },

  delete: async (req, res) => {
    const idJob = req.params.id

    await Job.delete(idJob)

    res.redirect('/')
  },
}