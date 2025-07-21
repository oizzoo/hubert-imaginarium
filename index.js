import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// __dirname dla ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// node web server
const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port: ${port}`);
});

// Ustawienia widoków i silnika szablonów
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Folder publiczny
app.use(express.static(path.join(__dirname, "public")));

// Parsowanie danych formularzy
app.use(bodyParser.urlencoded({ extended: true }));

// Landing page - główna strona "/"  
app.get("/", (req, res) => {
  res.render("landing-page");
});

// Główna zawartość strony pod "/main"
app.get("/main", (req, res) => {
  res.render("index");
});