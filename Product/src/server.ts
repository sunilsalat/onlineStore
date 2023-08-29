import express, { Request, Response } from "express";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to  Product app ");
});
//
app.listen(6000, () => {
  console.log(`Server running on port ${6000}`);
});
