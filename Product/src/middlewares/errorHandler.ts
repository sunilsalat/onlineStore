import { NextFunction, Request, Response } from "express";

const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({
    msg: err.message,
  });
};

export default ErrorHandlerMiddleware;
