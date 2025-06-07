import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
