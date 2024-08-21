import express, { Router } from 'express'
import { addCategory, getAllCategories } from '../controllers/category.controller.js'

const router = express.Router()

router.get('/',getAllCategories);
router.get('/onlycats',getAllCategories);
router.post('/',addCategory)

export default router