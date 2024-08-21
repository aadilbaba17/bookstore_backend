import express from  'express'
import { addBooks, getBooksBasedOnCategory, getPrefferedBooks } from '../controllers/book.contrller.js';
import protectRoute from '../middlewares/protectedRoute.js';

const router =express.Router();
router.get('/preffered',protectRoute,getPrefferedBooks)
router.get('/:id',getBooksBasedOnCategory)
router.post('/add-books',addBooks)
export default router