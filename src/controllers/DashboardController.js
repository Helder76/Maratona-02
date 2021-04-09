const Job = require('../models/Job')
const Profile = require('../models/Profile')
const Utils = require('../utils/JobUtils')


module.exports = {
  index: async (req, res) => {
    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length,
    }

    let jobTotalHours = 0

    const updateJobs = jobs.map((job) => {
      const remaining = Utils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      statusCount[status] += 1

      jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: Utils.calculateBudget(job, profile["value-hour"])
      }
    })

    const freeHours = profile["hours-per-day"] - jobTotalHours

    return res.render("index", { jobs: updateJobs, profile, statusCount, freeHours })
  },
}