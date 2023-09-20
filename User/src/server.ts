require("express-async-errors");
import express, { Request, Response } from "express";
import connectToDb from "./config/connectDb";
import { loadRoutes } from "./routes";
import { ErrorHandlerMiddleware, NotFoundRoute } from "./middlewares";

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to user application ");
});

loadRoutes(app);

app.use(NotFoundRoute);
app.use(ErrorHandlerMiddleware);

export { app };
