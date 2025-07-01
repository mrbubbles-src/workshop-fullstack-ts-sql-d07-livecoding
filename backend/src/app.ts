import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/error-handler.js';
import { router as operatorRouter } from './routes/operator.js';
import { router as memoriesRouter } from './routes/memories.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      `${process.env.HQ}`,
    ],
    credentials: true,
  }),
);

const PORT = process.env.PORT || 3001;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/operator', operatorRouter);
app.use('/memories', memoriesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🫡 Server is running at: http://localhost:${PORT}`);
});
