import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from 'src/db/index.js';
import { operatorTable } from 'src/db/schema.js';
import { comparePassword, createJWT, verifyJWT } from 'src/lib/auth/auth.js';
import { GlobalError, JWTPayload } from 'src/types/types.js';

export const getOperatorData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;
  if (!token) {
    const error: GlobalError = new Error('Missing token in cookies');
    error.statusCode = 400;
    return next(error);
  }

  const verifiedToken = verifyJWT(token);
  console.log('Verified token:', verifiedToken);

  if (!verifiedToken) {
    const error: GlobalError = new Error('Invalid token');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const operator = await db
      .select({
        id: operatorTable.id,
        operator_name: operatorTable.operator_name,
        role: operatorTable.role,
        memory_level: operatorTable.memory_level,
      })
      .from(operatorTable)
      .where(eq(operatorTable.id, verifiedToken.id))
      .limit(1);

    if (operator.length === 0) {
      const error: GlobalError = new Error(
        'Operator could not be found in the database.',
      );
      error.statusCode = 400;
      return next(error);
    }
    res.status(200).json({
      ok: true,
      message: 'Operator is valid. They may proceed.',
      ...operator[0],
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const operator = await db
      .select({
        id: operatorTable.id,
        operator_name: operatorTable.operator_name,
        role: operatorTable.role,
        memory_level: operatorTable.memory_level,
        password: operatorTable.password,
      })
      .from(operatorTable)
      .where(eq(operatorTable.email, email))
      .limit(1);

    if (operator.length === 0) {
      const error: GlobalError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }

    const isPasswordVaild = await comparePassword(
      password,
      operator[0].password,
    );

    if (!isPasswordVaild) {
      const error: GlobalError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }

    const { id, operator_name, role, memory_level } = operator[0];

    const token = createJWT({
      id,
      operator_name,
      role,
      memory_level: Number(memory_level),
    } as JWTPayload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {}
};

export const logoutOperator = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  } catch (error) {
    return next(error);
  }
};
