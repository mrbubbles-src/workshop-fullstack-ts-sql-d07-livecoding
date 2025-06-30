import { verifyJWT } from '../lib/auth/auth.js';
import { GlobalError, JWTPayload } from '../types/types.js';
import { Request, Response, NextFunction } from 'express';

export const verifyOperatorToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  console.log('Cookies:', req.cookies);

  const token = req.cookies.token;
  console.log('Verifying operator token:', token);
  if (!token) {
    return next();
  }
  try {
    const payload = verifyJWT(token) as JWTPayload;

    if (payload) {
      (req as Request & { operator?: JWTPayload }).operator = payload;
      return next();
    }
  } catch {
    const error: GlobalError = new Error('Ungültiger Token');
    error.statusCode = 401;
    return next(error);
  }
};
