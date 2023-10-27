require("express-async-errors");
import express, { Request, Response } from "express";
import { loadRoutes } from "./routes";
import { ErrorHandlerMiddleware, NotFoundRoute } from "./middlewares";

const app = express();
app.use(express.json());

app.get("/inventory/test", async (req: Request, res: Response) => {
    // const protocol = req.protocol;
    // const host = req.hostname;
    // const url = req.originalUrl;
    // const port = 8002;
    // const fullUrl = `${protocol}://${host}:${port}${url}`;
    // const responseString = `Full URL is: ${fullUrl}`;
    res.send("Welcome to inventory application");
});

loadRoutes(app);

app.use(NotFoundRoute);
app.use(ErrorHandlerMiddleware);

export { app };
