const express = require("express");
const env = require("dotenv");
const connectDB = require("./config/db")


// load env
env.config();

const app = express();
connectDB();

// Middleware to parse JSON req (it's like a doble check)
app.use(express.json());

// Define routes
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/private", require("./routes/pivate"))


// app.use("/api/auth", require("./routes/auth"));
// START SERVER
app.listen(process.env.PORT || 9000, () => {
  console.log(`App running on ${process.env.PORT}`)
})