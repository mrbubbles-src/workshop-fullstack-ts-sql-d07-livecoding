import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

const PORT = process.env.PORT;

//routes
app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hello D07');
  } catch (error) {
    next(error);
  }
});

// errorhandler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🫡 Server is running at: http://localhost:${PORT}`);
});
