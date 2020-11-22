const express = require("express");
const connectDB = require("./config/db");
const shortid = require("shortid");
const validUrl = require("valid-url");
const shortUrlRoute = require("./routes/shorturl")
const getShortenUrlRoute = require("./routes/getshortenurl")
const getAllUrls = require("./routes/getAllUrls")
const deleteUrl = require("./routes/deleteUrl")

const app = express();
connectDB();

app.use(express.json({}));
const PORT = 8000;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));

app.use(function (req, res, next) {
    // Website we wish to allow to connect, should be changed for production
    res.setHeader('Access-Control-Allow-Origin', '*')
  
    // Request methods we wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  
    // Request headers we wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type,XMLHttpRequest')
  
    next()
})

app.use("/v1/", getShortenUrlRoute);
app.use("/v1/shorturl", shortUrlRoute);
app.use("/all", getAllUrls);
app.use("/delete", deleteUrl)