require("dotenv").config(); // npm i dotenv

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, lozinka } = req.body;

  const query = "SELECT * FROM korisnici WHERE email = ? AND lozinka = ?";
  connection.query(query, [email, lozinka], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Greška servera" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Pogrešan email ili lozinka" });
    }

    const korisnik = results[0];

    res.json({ userId: korisnik.korisnik_id });
  });
});

// REGISTRACIJA
app.post("/api/register", (req, res) => {
  const { korisnickoIme, email, lozinka } = req.body;

  const query =
    "INSERT INTO korisnici (korisnicko_ime, email, lozinka) VALUES (?, ?, ?)";
  connection.query(query, [korisnickoIme, email, lozinka], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Greška kod registracije korisnika" });
    }
    res.json({ message: "Registracija uspješna" });
  });
});

// PRIKAZ BUDŽET
app.get("/api/budget/:userId", (req, res) => {
  const { userId } = req.params;
  const today = new Date();
  const mjesec = today.getMonth() + 1; // JS mjeseci su 0-indeksirani
  const godina = today.getFullYear();

  const query = `
    SELECT 
      COALESCE((SELECT iznos FROM budzeti WHERE korisnik_id = ? AND mjesec = ? AND godina = ?), 0) AS ukupanBudzet,
      COALESCE((SELECT SUM(iznos) FROM rashodi WHERE korisnik_id = ? AND MONTH(datum) = ? AND YEAR(datum) = ?), 0) AS ukupniRashod
  `;

  connection.query(
    query,
    [userId, mjesec, godina, userId, mjesec, godina],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Greška na serveru" });
      }

      const ukupanBudzet = results[0].ukupanBudzet;
      const ukupniRashod = results[0].ukupniRashod;
      const ostalibudzet = ukupanBudzet - ukupniRashod;

      res.json({ ukupanBudzet, ukupniRashod, ostalibudzet });
    }
  );
});

// POSTAVI BUDŽET
app.post("/api/set-budget", (req, res) => {
  const { userId, iznos } = req.body;
  const today = new Date();
  const mjesec = today.getMonth() + 1;
  const godina = today.getFullYear();

  const query =
    "INSERT INTO budzeti (korisnik_id, iznos, mjesec, godina) VALUES (?, ?, ?, ?)";

  connection.query(query, [userId, iznos, mjesec, godina], (err) => {
    if (err) {
      return res.status(500).json({ error: "Greška kod postavljanja budžeta" });
    }
    res.json({ message: "Budžet uspješno postavljen" });
  });
});

// RASHODI
app.post("/api/add-rashod", (req, res) => {
  const { userId, kategorija, iznos } = req.body;

  const query = `
    INSERT INTO rashodi (korisnik_id, kategorija, iznos)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [userId, kategorija, iznos], (err) => {
    if (err) {
      return res.status(500).json({ error: "Greška kod unosa rashoda" });
    }
    res.json({ message: "Rashod uspješno dodan" });
  });
});

//  PRIHODI
app.post("/api/add-prihod", (req, res) => {
  const { userId, iznos } = req.body;

  const query = `
    INSERT INTO prihodi (korisnik_id, iznos)
    VALUES (?, ?)
  `;

  connection.query(query, [userId, iznos], (err) => {
    if (err) {
      return res.status(500).json({ error: "Greška kod unosa rashoda" });
    }
    res.json({ message: "Prihod uspješno dodan" });
  });
});

// TRANSAKCIJE
app.get("/api/transactions/user/:userId", (req, res) => {
  const userId = req.params.userId;

  const prihodiQuery =
    "SELECT iznos, datum FROM prihodi WHERE korisnik_id = ? ORDER BY datum DESC";
  const rashodiQuery =
    "SELECT kategorija, iznos, datum FROM rashodi WHERE korisnik_id = ? ORDER BY datum DESC";

  connection.query(prihodiQuery, [userId], (err, prihodiResult) => {
    if (err) {
      console.error("Greška kod dohvaćanja prihoda:", err);
      return res.status(500).json({ error: "Greška kod prihoda" });
    }

    connection.query(rashodiQuery, [userId], (err, rashodiResult) => {
      if (err) {
        console.error("Greška kod dohvaćanja rashoda:", err);
        return res.status(500).json({ error: "Greška kod rashoda" });
      }

      res.json({
        prihodi: prihodiResult,
        rashodi: rashodiResult,
      });
    });
  });
});

// MAIL
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER, // tvoj Gmail
    to: process.env.SMTP_USER, // gdje želiš da stigne poruka
    subject: "Poruka iz StudentBudget aplikacije",
    text: `user: ${email}\nporuka: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent succesfully!" });
  } catch (error) {
    console.error("Email sending failed", error),
      res.status(500).json({ message: "Email sending failed" });
  }
});
//module.exports = app;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
