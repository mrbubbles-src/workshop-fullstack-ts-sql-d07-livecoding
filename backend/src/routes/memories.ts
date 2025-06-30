import {
  checkMemoryStatus,
  getUnclassifiedMemory,
} from '../controllers/memories.js';
import express from 'express';

export const router = express.Router();

router.route('/').get(getUnclassifiedMemory);

router.route('/check-status').post(checkMemoryStatus);
