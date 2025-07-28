import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Landing page polski - domyślny na "/"
app.get("/", (req, res) => {
  res.render("landing-page", { lang: "pl" });
});

// Landing page angielski na "/en"
app.get("/en", (req, res) => {
  res.render("landing-page", { lang: "en" });
});

// Strona główna aplikacji w języku polskim - "/main"
app.get("/main", (req, res) => {
  res.render("index", { lang: "pl" });
});

// Strona główna aplikacji w języku angielskim - "/en-main"
app.get("/en-main", (req, res) => {
  res.render("index", { lang: "en" });
});

// 404 dla innych ścieżek (opcjonalnie)
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono strony");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
