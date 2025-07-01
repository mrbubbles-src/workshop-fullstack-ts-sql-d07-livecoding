import { Request, Response, NextFunction } from 'express';
import { GlobalError } from '../types/types.js';

export const errorHandler = (
  err: GlobalError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode).json({
    statusCode,
    message: err.message,
  });
};
