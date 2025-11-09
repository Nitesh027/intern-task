import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {  getJobs, getJob,  addJob, updateJob, deleteJob, getJobCount } from '../controllers/jobController.js';

const router = express.Router();

router.get('/count', authMiddleware, getJobCount);
router.get('/', authMiddleware, getJobs);
router.post('/add', authMiddleware, addJob);
router.get('/:id', authMiddleware, getJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;