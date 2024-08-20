import express, { Router } from 'express'
import { addCategory, getAllCategories } from '../controllers/category.controller.js'

const router = express.Router()

router.get('/',getAllCategories);
router.post('/',addCategory)

export default router