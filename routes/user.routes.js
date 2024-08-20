import express from 'express'
import { addPrefferedCategory, getPrefferedCategories } from '../controllers/prefferedCategory.controller.js';
import protectRoute from '../middlewares/protectedRoute.js';

const router = express.Router();
router.post('/add',protectRoute,addPrefferedCategory)
router.get('/',protectRoute,getPrefferedCategories);
export default router