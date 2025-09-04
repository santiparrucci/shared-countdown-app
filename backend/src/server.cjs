// src/server.cjs
const express = require("express"); // crea la app
const cors = require("cors"); // CORS
require("dotenv").config(); // variables de entorno

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Routers (importás cada módulo)
const healthRouter = require("./routes/health");
const countdownsRouter = require("./routes/countdowns");

// Montás routers en paths base
app.use("/health", healthRouter); // GET /health
app.use("/countdowns", countdownsRouter); // GET/POST/PATCH/DELETE /countdowns...

// (Opcional) middleware de errores centralizado
const errorMiddleware = require("./middlewares/error");
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
