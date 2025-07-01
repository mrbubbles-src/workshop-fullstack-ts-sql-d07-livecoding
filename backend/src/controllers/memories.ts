import { db } from '../db/index.js';
import { unclassifiedMemoriesTable } from '../db/schema.js';
import { verifyJWT } from '../lib/auth/auth.js';
import { classifyMemory, restoreMemory } from '../lib/memories.js';
import { UnclassifiedMemory } from '../types/types.js';
import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';

export const getUnclassifiedMemory = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const unclassifiedMemories = await db
      .select()
      .from(unclassifiedMemoriesTable)
      .where(eq(unclassifiedMemoriesTable.status, 'unclassified'));

    if (unclassifiedMemories.length === 0) {
      res.status(404).json({ message: 'No valid unclassified memory found.' });
      return;
    }

    const randomMemory =
      unclassifiedMemories[
        Math.floor(Math.random() * unclassifiedMemories.length)
      ];

    await db
      .update(unclassifiedMemoriesTable)
      .set({ status: 'in_progress' })
      .where(eq(unclassifiedMemoriesTable.id, randomMemory.id));

    res.status(200).json({ memory: randomMemory });
    return;
  } catch (error) {
    return next(error);
  }
};

export const checkMemoryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { memoryId } = req.body;
    const { token } = req.cookies;

    if (!memoryId) {
      res.status(400).json({ message: 'Memory ID is required.' });
      return;
    }

    if (!token) {
      res.status(401).json({ message: 'Operator token is required.' });
      return;
    }

    const verifiedToken = verifyJWT(token);

    if (!verifiedToken) {
      res.status(401).json({ message: 'Invalid or expired Operator token.' });
      return;
    }

    const operatorId = verifiedToken.id;

    const isMemoryCorrect = Math.random() > 0.4;

    if (isMemoryCorrect) {
      try {
        const memoryToClassify = await db
          .select()
          .from(unclassifiedMemoriesTable)
          .where(eq(unclassifiedMemoriesTable.id, memoryId));

        if (memoryToClassify.length === 0) {
          res.status(404).json({
            message: 'Memory was already classified. By another Operator.',
          });
          return;
        }

        const shouldRestore = Math.random() > 0.5;

        const memory: UnclassifiedMemory = memoryToClassify[0];
        if (shouldRestore) {
          await restoreMemory(memory, operatorId);
          res.status(200).json({
            message: 'Memory restored successfully.',
          });
          return;
        }
        await classifyMemory(memory);
        res.status(200).json({
          message: 'Memory classified successfully.',
        });
        return;
      } catch (error) {
        return next(error);
      }
    }
    res.status(200).json({ message: 'Try again.' });
  } catch (error) {
    return next(error);
  }
};
