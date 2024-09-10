import express from 'express'
import { addPrefferedCategory, getPrefferedCategories} from '../controllers/prefferedCategory.controller.js';
import protectRoute from '../middlewares/protectedRoute.js';
import { addToFavourites } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/add',protectRoute,addPrefferedCategory)
router.get('/',protectRoute,getPrefferedCategories);
router.post('/add_to_favourites',protectRoute,addToFavourites)
export default router