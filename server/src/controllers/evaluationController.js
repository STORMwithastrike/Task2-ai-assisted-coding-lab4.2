import { Evaluation } from '../models/Evaluation.js';

// GET /api/evaluations
// TODO: implement per README.md section 2.
export async function getAllEvaluations(req, res, next) {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json({ evaluations });
  } catch (err) { next(err); }
}

// GET /api/evaluations/:id
// TODO: implement per README.md section 2.
export async function getEvaluation(req, res, next) {
  try {
    const { id } = req.params;
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    res.status(200).json({ evaluation });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    next(err);
  }
}

// POST /api/evaluations
// TODO: implement per README.md section 2.
export async function createEvaluation(req, res, next) {
  try {
    const evaluation = await Evaluation.create(req.body);
    res.status(201).json({ evaluation });
  } catch (err) { next(err); }
}

// GET /api/evaluations/summary?seminarCode=SM101
// TODO: implement per README.md section 3.
export async function getEvaluationSummary(req, res, next) {
  try {
    const { seminarCode } = req.query;
    if (!seminarCode) {
      return res.status(400).json({ message: 'seminarCode is required' });
    }

    const summary = await Evaluation.aggregate([
      { $match: { seminarCode } },
      { $group: {
          _id: '$seminarCode',
          averageScore: { $avg: '$score' },
          evaluationCount: { $sum: 1 }
        }
      }
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        seminarCode,
        averageScore: 0,
        evaluationCount: 0
      });
    }

    res.status(200).json({
      seminarCode: summary[0]._id,
      averageScore: summary[0].averageScore,
      evaluationCount: summary[0].evaluationCount
    });
  } catch (err) { next(err); }
}
