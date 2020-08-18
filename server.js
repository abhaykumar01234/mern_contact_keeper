const express = require("express");
const app = express();
const connectDB = require("./config/db");

// connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
