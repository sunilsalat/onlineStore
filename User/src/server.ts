import express, { Request, Response } from "express";
import connectToDb from "./config/connectDb";
import { loadRoutes } from "./routes";
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to user app ");
});

loadRoutes(app);

export { app };
