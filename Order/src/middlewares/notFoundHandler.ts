import { Request, Response } from "express";

const NotFoundRoute = (req: Request, res: Response) => {
  return res.status(404).send("Page you are looking for not found!");
};

export default NotFoundRoute;
