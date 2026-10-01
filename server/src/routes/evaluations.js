import { Router } from 'express';
import {
  getAllEvaluations,
  getEvaluation,
  createEvaluation,
  getEvaluationSummary
} from '../controllers/evaluationController.js';

const router = Router();

router.get('/summary', getEvaluationSummary);
router.post('/', createEvaluation);
router.get('/', getAllEvaluations);
router.get('/:id', getEvaluation);

export default router;
