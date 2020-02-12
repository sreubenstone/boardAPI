require("dotenv").config();
import express from "express";
import cors = require("cors");
import bodyParser from "body-parser";
import game from "./game";

const app = express();
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true
};

app.use(cors(corsOptions));

const jsonParser = bodyParser.json();

app.post("/game", jsonParser, async function (req, res) {
  const { position, flag } = req.body
  const board = game(position);
  const response = JSON.stringify(board);
  res.send(response);
});



const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on http server.`);
});
