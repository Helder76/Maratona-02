const Profile = require('../models/Profile')

module.exports = {
  index: async (req, res) => {
    return res.render("profile", { profile: await Profile.get() })
  },

  update: async (req, res) => {
    const data = req.body
    const weeksPerMonth = (52 - data["vacation-per-year"]) / 12
    const valueHour = data["monthly-budget"] /
    (data["hours-per-day"] * data["days-per-week"] * weeksPerMonth)

    const profile = await Profile.get()
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })
    
    return res.redirect('/')
  },
}