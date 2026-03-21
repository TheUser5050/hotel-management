import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: 'localhost',
  user: 'hotel_user',
  password: '12345678',
  database: 'hotel-management',
  waitForConnections: true,
  connectionLimit: 10
})

export default db;
