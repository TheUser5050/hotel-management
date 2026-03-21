import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: 'localhost',
  user: 'hotel_user',
  password: process.env.DB_PASSWORD,
  database: 'hotel_management',
  waitForConnections: true,
  connectionLimit: 10
})

export default db;
