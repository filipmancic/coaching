const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const blogRoutes = require('./routes/blogRoutes');
require("dotenv").config();


const app = express()

app.get("/",(req,res)=>{
    res.json("hellowrld")
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use('/api/blog', blogRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
