import { NextFunction, Request, Response } from 'express';
import { operatorsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { comparePassword, createJWT, verifyJWT } from '../lib/auth/auth.js';
import { GlobalError, JWTPayload } from '../types/types.js';

export const getOperatorData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('cookies', req.cookies);
  const { token } = req.cookies;
  console.log('Validating operator token:', token);

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
        id: operatorsTable.id,
        operator_name: operatorsTable.operator_name,
        role: operatorsTable.role,
        memory_level: operatorsTable.memory_level,
      })
      .from(operatorsTable)
      .where(eq(operatorsTable.id, verifiedToken.id))
      .limit(1);

    if (operator.length === 0) {
      const error: GlobalError = new Error(
        'Operator could not be found in the database.',
      );
      error.statusCode = 400;
      return next(error);
    }
    console.log('Operator found:', { ...operator[0] });
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
    console.log('Verifying operator with email:', email);
    console.log('Verifying operator with password:', password);

    const operator = await db
      .select({
        id: operatorsTable.id,
        operator_name: operatorsTable.operator_name,
        role: operatorsTable.role,
        memory_level: operatorsTable.memory_level,
        password: operatorsTable.password,
      })
      .from(operatorsTable)
      .where(eq(operatorsTable.email, email))
      .limit(1);
    console.log('Operator found array:', operator);
    if (operator.length === 0) {
      const error: GlobalError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }
    console.log('Operator found:', operator[0]);
    const isPasswordValid = await comparePassword(
      password,
      operator[0].password,
    );
    console.log('Is password valid:', isPasswordValid);
    if (!isPasswordValid) {
      const error: GlobalError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }

    const { id, operator_name, role, memory_level } = operator[0];

    const token = createJWT(
      {
        id,
        operator_name,
        role,
        memory_level: Number(memory_level),
      } as JWTPayload,
      '5h',
    );
    console.log('Generated token:', token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return next(error);
  }
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
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return next(error);
  }
};
