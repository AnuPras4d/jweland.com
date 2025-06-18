import mysql from 'mysql2/promise';

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test connection
  pool.getConnection().then(conn => {
    console.log('✅ MySQL connected successfully');
    conn.release();
  }).catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
  });
} catch (error) {
  console.error('❌ Failed to create MySQL pool:', error.message);
}

export default pool;
