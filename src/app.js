const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); // http modülünü ekledik
const domainRoutes = require("./routes/domainRoutes");
const initializeSocket = require("./config/socket");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// HTTP ve WebSocket Sunucusunu Başlat
const server = http.createServer(app);
const io = initializeSocket(server); // WebSocket'i başlat

app.use("/domains", domainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
