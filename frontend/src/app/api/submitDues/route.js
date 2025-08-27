import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body; // Contains all data from the form

    // Generate a unique PayPal ID (you might have a more robust way)
    const new_pp_id = `PP_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Database connection
    const connection = await mysql.createConnection({
      host:     process.env.MY_SQL_HOST,
      user:     process.env.MY_SQL_USER,
      password: process.env.MY_SQL_PASSWORD,
      database: process.env.MY_SQL_DATABASE,
    });

    try {
      // Extract necessary fields from formData for insertion into pp_tnx
      // Ensure your 'pp_tnx' table schema matches these fields
      const {
        years, newmember, callsigns, ncallsigns, callsign, fullname,
        primary, family, repeater, digipeater, subtotal, pay_paypal,
        paypalfee, clubreceives, total, pp_total, date, transaction_status
      } = formData;

      const [result] = await connection.execute(
        `INSERT INTO pp_tnx (
          years, newmember, callsigns, ncallsigns, callsign, fullname,
          primary_dues, family_dues, repeater_donation, digipeater_donation,
          subtotal, pay_paypal, paypal_fee, club_receives, total_charges,
          pp_total_for_paypal, transaction_date, transaction_status, pp_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          years, newmember, callsigns, ncallsigns, callsign, fullname,
          primary, family, repeater, digipeater, subtotal, pay_paypal,
          paypalfee, clubreceives, total, pp_total, date, transaction_status, new_pp_id
        ]
      );
      await connection.end();
      res.status(200).json({ message: 'Data inserted successfully', new_pp_id });
    } catch (error) {
      console.error('Database insertion error:', error);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}