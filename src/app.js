const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const domainRoutes = require("./routes/domainRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// HTTP ve WebSocket Sunucusunu Başlat
const server = createServer(app);
const io = initializeSocket(server); // WebSocket'i başlat

app.use("/domains", domainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
