const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With,  Content-Type , Accept , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.get("/videoData", async (req, res, next) => {
  const data = await fetch("https://public.connectnow.org.uk/applicant-test/");
  const jsonData = await data.json();
  res.status(200).json(jsonData);
});

app.listen(port, () => {
  console.log(`Listining on port : ${port}`);
});
