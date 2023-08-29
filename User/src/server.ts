import express, { Request, Response } from "express";
import connectToDb from "./config/connectDb";
import { loadRoutes } from "./routes";

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to user app ");
});

loadRoutes(app);

const start = async () => {
  await connectToDb("mongodb://mongo-user:27017/users");
  app.listen(5000, () => {
    console.log(`Server running on port ${5000}`);
  });
};

start();
