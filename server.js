import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import fetch from "node-fetch";
const cors = require("cors");
require('dotenv').config()
const corsOptions = {
      origin: ["http://localhost:3000", "https://newsappplication.netlify.app"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.get("/",  (req, res) => {
  res.json("hello world");
});

app.get("/trendingnews", async (req, res) => {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=in&pageSize=6&apiKey=${process.env.REACT_APP_APIKEY}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((data) => res.status(200).json(data));
});

app.post("/caroselnews", async (req, res) => {
  const subject = JSON.parse(req.body.body);
  fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${subject}&apiKey=${process.env.REACT_APP_APIKEY}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((data) => res.status(200).json(data));
});

app.post("/search", async (req, res) => {
  var today = new Date();
  today.setMonth(today.getMonth() - 1);
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  var pastDate = year + '-' + month + '-' + day;
  const searchtopic = JSON.parse(req.body.body);
  fetch(
    `https://newsapi.org/v2/everything?q=${searchtopic}&from=${pastDate}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_APIKEY}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((data) => res.status(200).json(data));
});

app.listen(8000, () => {
  console.log(`Example app listening on port ${8000}`);
});
