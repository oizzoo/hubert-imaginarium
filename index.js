import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // do weryfikacji recaptcha

// Załaduj zmienne środowiskowe z .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// Middleware do parsowania danych formularzy x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Ustawienia dla widoków EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serwowanie statycznych plików (np. css, js, obrazy)
app.use(express.static(path.join(__dirname, "public")));

// --- ROUTING ---

// Strony główne i informacyjne
app.get("/", (req, res) => {
  res.render("landing-page", { lang: "pl" });
});

app.get("/en", (req, res) => {
  res.render("landing-page", { lang: "en" });
});

app.get("/main", (req, res) => {
  res.render("index", { lang: "pl" });
});

app.get("/en-main", (req, res) => {
  res.render("index", { lang: "en" });
});

app.get("/o-mnie", (req, res) => {
  res.render("o-mnie", { lang: "pl" });
});

app.get("/en-o-mnie", (req, res) => {
  res.render("o-mnie", { lang: "en" });
});

app.get("/kontakt", (req, res) => {
  res.render("kontakt", { lang: "pl", success: null, error: null, oldInput: {} });
});

app.get("/en-kontakt", (req, res) => {
  res.render("kontakt", { lang: "en", success: null, error: null, oldInput: {} });
});

// --- KONFIGURACJA nodemailer ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Twój email w .env
    pass: process.env.EMAIL_PASS, // Twoje hasło lub app password w .env
  },
  logger: true,
  debug: true,
});

// --- Google reCAPTCHA ---
// Tajny klucz do weryfikacji tokenu (Secret Key)
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET;

  if (!token) return false;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secretKey}&response=${token}`, // token z formularza, weryfikacja u Google
  });

  const data = await response.json();
  return data.success === true;
}

// Obsługa POST - wysyłka maili kontaktowych (PL)
app.post("/kontakt", async (req, res) => {
  const { email, message, website, "g-recaptcha-response": recaptchaToken } = req.body;

  // Pole honeypot - jeśli jest wypełnione, to bot (odrzucamy)
  if (website && website.trim() !== "") {
    return res.render("kontakt", {
      lang: "pl",
      success: false,
      error: "Wykryto podejrzaną próbę wysłania wiadomości.",
      oldInput: { email, message },
    });
  }

  // Weryfikacja reCAPTCHA za pomocą wcześniej napisanej funkcji  
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.render("kontakt", {
      lang: "pl",
      success: false,
      error: "Proszę potwierdzić, że nie jesteś robotem.",
      oldInput: { email, message },
    });
  }

  // Podstawowa walidacja na backendzie
  if (!email || !message) {
    return res.render("kontakt", {
      lang: "pl",
      success: false,
      error: "Proszę wypełnić wszystkie pola.",
      oldInput: { email, message },
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Formularz kontaktowy" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "Nowa wiadomość ze strony kontaktowej",
      text: `Wiadomość od: ${email}\n\n${message}`,
      replyTo: email,
    });

    console.log("Wiadomość wysłana. ID:", info.messageId);

    return res.render("kontakt", {
      lang: "pl",
      success: true,
      error: null,
      oldInput: {},
    });
  } catch (error) {
    console.error("Błąd wysyłki maila:", error);
    return res.render("kontakt", {
      lang: "pl",
      success: false,
      error: "Wystąpił błąd podczas wysyłania wiadomości.",
      oldInput: { email, message },
    });
  }
});

// Analogiczna obsługa POST dla wersji angielskiej
app.post("/en-kontakt", async (req, res) => {
  const { email, message, website, "g-recaptcha-response": recaptchaToken } = req.body;

  if (website && website.trim() !== "") {
    return res.render("kontakt", {
      lang: "en",
      success: false,
      error: "Suspicious submission detected.",
      oldInput: { email, message },
    });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.render("kontakt", {
      lang: "en",
      success: false,
      error: "Please confirm you are not a robot.",
      oldInput: { email, message },
    });
  }

  if (!email || !message) {
    return res.render("kontakt", {
      lang: "en",
      success: false,
      error: "Please fill in all fields.",
      oldInput: { email, message },
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Contact form" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "New message from contact form",
      text: `Message from: ${email}\n\n${message}`,
      replyTo: email,
    });

    console.log("Email sent. ID:", info.messageId);

    return res.render("kontakt", {
      lang: "en",
      success: true,
      error: null,
      oldInput: {},
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.render("kontakt", {
      lang: "en",
      success: false,
      error: "Error occurred while sending message.",
      oldInput: { email, message },
    });
  }
});

// 404 dla innych ścieżek - opcjonalnie
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono strony");
});

// --- START SERVERA ---
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
