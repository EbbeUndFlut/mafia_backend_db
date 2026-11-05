import express from 'express'
import { createDon, getAllFreeCats, getCats, hireFreeCat } from '../controller/cat.controller.js'

export const router = new express.Router()

router.get('/cat', getCats)
router.get('/cat/free', getAllFreeCats)

router.post('/cat', createDon)

router.put('/cat/hire/:id', hireFreeCat)