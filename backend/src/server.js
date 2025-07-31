require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // For CommonJS

// --- Middleware ---
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://coastsidearc.org",
      "http://192.168.1.222:3000",
      "http://192.168.1.110:3000",
    ],

    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Add this debug log line
console.log("Loading DB Config from .env:", {
  host: process.env.MY_SQL_SERVER,
  user: process.env.MY_SQL_USER,
  port: process.env.MY_SQL_PORT,
  password: "***", // Don't log the password
  database: process.env.MY_SQL_DATABASE,
});

// --- MySQL Connection Pool ---
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MY_SQL_SERVER,
  user: process.env.MY_SQL_USER,
  port: process.env.MY_SQL_PORT ? parseInt(process.env.MY_SQL_PORT, 10) : 3306,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
});

// --- API Route 1: Get FullName (using the connection pool) ---
app.post("/api/getFullName", async (req, res) => {
  const { callsign } = req.body;
  if (!callsign) {
    return res.status(400).json({ error: "Callsign is required" });
  }
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT FullName FROM merged WHERE callsign = ? LIMIT 1",
      [callsign]
    );
    if (rows.length > 0) {
      res.status(200).json({ result: { FullName: rows[0].FullName } });
    } else {
      res.status(200).json({ result: null });
    }
  } catch (error) {
    console.error("Database error in /api/getFullName:", error);
    res.status(500).json({ error: "Failed to retrieve FullName" });
  } finally {
    if (connection) connection.release();
  }
});

// --- API Route 2: Submit Dues Data (using the connection pool) ---
app.post("/api/submitDues", async (req, res) => {
  const formData = req.body;
  if (!formData || !formData.callsign || !formData.total) {
    return res.status(400).json({ error: "Missing required form data" });
  }
  const new_pp_id = `PP_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;
  let connection;
  try {
    connection = await pool.getConnection();
    const insertSql = `
            INSERT INTO pp_tnx (
                years, newmember, callsigns, ncallsigns, callsign, fullname,
                primary_dues, family_dues, repeater_donation, digipeater_donation,
                subtotal, pay_paypal, paypal_fee, club_receives, total_charges,
                pp_total_for_paypal, transaction_date, transaction_status, pp_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const insertValues = [
      formData.years,
      formData.newmember,
      formData.callsigns,
      formData.ncallsigns,
      formData.callsign,
      formData.fullname || "N/A",
      formData.primary,
      formData.family,
      formData.repeater,
      formData.digipeater,
      formData.subtotal,
      formData.pay_paypal,
      formData.paypalfee,
      formData.clubreceives,
      formData.total,
      formData.pp_total,
      formData.date,
      formData.transaction_status,
      new_pp_id,
    ];
    await connection.execute(insertSql, insertValues);
    res.status(200).json({ message: "Data inserted successfully", new_pp_id });
  } catch (error) {
    console.error("Database error in /api/submitDues:", error);
    res.status(500).json({ error: "Failed to insert data" });
  } finally {
    if (connection) connection.release();
  }
});

// --- API Route 3: Check Repeater Report Existence (No database needed) ---
app.get("/api/repeater-report-exists", async (req, res) => {
  const { year, month } = req.query; // Expect year and month as query parameters
  if (!year || !month) {
    return res
      .status(400)
      .json({ error: "Year and month query parameters are required." });
  }
  // The external URL for the repeater report
  const reportUrl = `https://audio.stickerburr.net/files/${month}_${year}/index.html`;

    try {
        const response = await fetch(reportUrl, { method: 'HEAD' }); // Use HEAD request for efficiency
        // HEAD request usually returns status code without downloading full content
        // Check if the status code indicates success (200-299 range)
        if (response.ok) { // response.ok is true for 2xx status codes
            res.status(200).json({ exists: true, url: reportUrl });
        } else if (response.status === 404) {
            res.status(200).json({ exists: false, url: reportUrl, message: 'File not found.' });
        } else {
            console.error(`Error checking report ${reportUrl}: Status ${response.status}`);
            res.status(500).json({ exists: false, url: reportUrl, message: `Server error: ${response.status}` });
        }
    } catch (error) {
        console.error(`Network or fetch error checking report ${reportUrl}: ${error.message}`);
        res.status(500).json({ exists: false, url: reportUrl, message: `Network error: ${error.message}` });
    }
});

// --- Database Connection Test Function ---
async function testDbConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.release();
    console.log("Database connection successful!");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

// --- Start Server ---
async function startServer() {
  const isDbConnected = await testDbConnection();
  if (!isDbConnected) {
    console.error("Server startup aborted due to database connection failure.");
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Backend server is listening on http://localhost:${port}`);
  });
}

startServer();
