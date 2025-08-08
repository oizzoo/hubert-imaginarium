import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Załaduj zmienne środowiskowe z .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/main', (req, res) => {
  res.render('layout', { 
    title: 'Hubert Kniaź Imaginarium', 
    lang: 'pl', 
    body: 'index'  // nazwa pliku z widokiem
  });
});

app.get('/en-main', (req, res) => {
  res.render('layout', { 
    title: 'Hubert Kniaź Imaginarium', 
    lang: 'en', 
    body: 'index' 
  });
});


app.get('/o-mnie', (req, res) => {
  res.render('layout', { 
    title: 'O mnie', 
    lang: 'pl', 
    body: 'o-mnie' 
  });
});

app.get('/en-o-mnie', (req, res) => {
  res.render('layout', { 
    title: 'About me', 
    lang: 'en', 
    body: 'o-mnie' 
  });
});

// GET kontakt (polski)
app.get("/kontakt", (req, res) => {
  res.render("layout", { 
    lang: "pl", 
    title: "Kontakt - Hubert Kniaź", 
    body: "kontakt", 
    success: null, 
    error: null, 
    oldInput: {} 
  });
});

// GET kontakt (angielski)
app.get("/en-kontakt", (req, res) => {
  res.render("layout", { 
    lang: "en", 
    title: "Contact - Hubert Kniaź", 
    body: "kontakt", 
    success: null, 
    error: null, 
    oldInput: {} 
  });
});

app.get("/materialy/uniwersum-drugiej-ziemi", (req, res) => {
  res.render("layout", {
    lang: "pl",
    title: "Uniwersum drugiej ziemi",
    body: "uniwersum-drugiej-ziemi",
    success: null, 
    error: null, 
    oldInput: {} 
  })
});


app.get("/en-materialy/uniwersum-drugiej-ziemi", (req, res) => {
  res.render("layout", {
    lang: "en",
    title: "Uniwersum drugiej ziemi",
    body: "uniwersum-drugiej-ziemi",
    success: null, 
    error: null, 
    oldInput: {} 
  })
});

app.get("/materialy/uniwersum-drugiej-ziemi/koncept-postaci", (req, res) => {
  res.render("layout-pdf", {
    lang: "pl",
    title: "Koncept postaci",
    body: "koncept-postaci",
    success: null, 
    error: null, 
    oldInput: {} 
  })
});

app.get("/en-materialy/uniwersum-drugiej-ziemi/koncept-postaci", (req, res) => {
  res.render("layout-pdf", {
    lang: "en",
    title: "Koncept postaci",
    body: "koncept-postaci",
    success: null, 
    error: null, 
    oldInput: {} 
  })
});

// 404 dla innych ścieżek - opcjonalnie
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono strony");
});

// --- START SERVERA ---
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
