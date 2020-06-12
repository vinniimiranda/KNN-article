const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '165.227.202.73',
    user: 'root',
    password: 'artigo',
    database: 'artigo'
  },
  pool: { min: 0, max: 7 }
})

export default knex
