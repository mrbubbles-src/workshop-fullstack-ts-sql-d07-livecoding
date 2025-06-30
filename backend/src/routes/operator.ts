import express from 'express';
import {
  getOperatorData,
  logoutOperator,
  verifyOperator,
} from '../controllers/operator.js';
import { operatorValidationRules } from '../lib/auth/auth-rules.js';
import { validateInputs } from '../middleware/input-validation.js';

export const router = express.Router();

router.route('/data').post(getOperatorData);
router
  .route('/login')
  .post(validateInputs(operatorValidationRules.login), verifyOperator);
router.route('/logout').post(logoutOperator);
