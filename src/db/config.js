const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


const openDB = () =>
  open({
    filename: './src/db/database.sqlite',
    driver: sqlite3.Database
  })


module.exports = openDB
