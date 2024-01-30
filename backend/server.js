// app.js
const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Load different route files
const notesRoutes = require("./routes/notes");
dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware to log request type and URL
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use the routes
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
