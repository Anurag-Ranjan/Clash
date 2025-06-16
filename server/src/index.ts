import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import router from "./routes/index.js";
import cors from "cors";
import { appLimiter } from "./config/limiter.js";
import fileUpload from "express-fileupload";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(appLimiter);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

const PORT = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    name: "Anurag",
  });
  // await sendMail("anurag@gmail.com", "Welcome to Clash", html);
  await emailQueue.add(emailQueueName, {
    to: "anurag@gmail.com",
    subject: "Test Email",
    body: html,
  });
  res.json({ message: "Data added to queue successfully" });
});

app.use(router);

import { emailQueue, emailQueueName } from "./jobs/index.js"; // new thing learnt, even when writing an export call after the use, it works

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
