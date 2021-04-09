const Database = require('../db/config')

let data = [{
  id: 1,
  name: "Pizzaria Guloso",
  "daily-hours": 8,
  "total-hours": 0,
  created_at: Date.now(),
  budget: 2500
},
{
  id: 2,
  name: "OneTwo Project",
  "daily-hours": 3,
  "total-hours": 47,
  created_at: Date.now(),
  budget: 4750.55
}]

module.exports = {
  async get() {
    const db = await Database()
    const jobs = await db.all(`SELECT * FROM jobs`)
    await db.close()

    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at,
    }))
  },
  async update(newData) {
    const db = await Database()
    await db.run(`UPDATE jobs SET 
      name = "${newData.name}",
      daily_hours = ${newData["daily-hours"]},
      total_hours = ${newData["total-hours"]}
    WHERE id = ${newData.id}`)
    await db.close()
  },
  async delete(idData) {
    const db = await Database()
    await db.run(`DELETE FROM jobs WHERE id = ${idData}`)
    await db.close()
  },
  async create(newJob) {
    const db = await Database()
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.created_at}
    )`)
    await db.close()
  }
}