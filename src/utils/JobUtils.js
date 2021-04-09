
module.exports = {
  remainingDays(job) {
    const remainingDays = Math.ceil((job['total-hours'] / job['daily-hours']))
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDate = createdDate.setDate(dueDay)

    const dayDiff = Math.ceil(((dueDate - Date.now()) / (1000 * 60 * 60 * 24)))
    return dayDiff
  },
  calculateBudget: (job, valueHour) => {
    return valueHour * job["total-hours"]
  },
}