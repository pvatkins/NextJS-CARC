import mysql from 'mysql2/promise'; // or your preferred DB library

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { callsign } = req.body;

    // Database connection (replace with your actual credentials)
    const connection = await mysql.createConnection({
      host:     process.env.MY_SQL_HOST,
      user:     process.env.MY_SQL_USER,
      password: process.env.MY_SQL_PASSWORD,
      database: process.env.MY_SQL_DATABASE
    });

    try {
      const [rows] = await connection.execute(
        'SELECT FullName FROM merged WHERE callsign = ? LIMIT 1',
        [callsign]
      );
      await connection.end();
      if (rows.length > 0) {
        res.status(200).json({ result: { FullName: rows[0].FullName } });
      } else {
        res.status(200).json({ result: null });
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Failed to retrieve FullName' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
