import express from 'express'
import { addPrefferedCategory, getPrefferedCategories} from '../controllers/prefferedCategory.controller.js';
import protectRoute from '../middlewares/protectedRoute.js';
import { addToFavourites, getBookmark, getFavourites, isFavourite, saveBookmark } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/add',protectRoute,addPrefferedCategory)
router.get('/',protectRoute,getPrefferedCategories);
router.post('/add_to_favourites',protectRoute,addToFavourites)
router.get('/get_favourites',protectRoute,getFavourites)
router.post('/is_favourites',protectRoute,isFavourite)
router.get('/get_bookmark',protectRoute,getBookmark)
router.post('/add_bookmark',protectRoute,saveBookmark)
export default router