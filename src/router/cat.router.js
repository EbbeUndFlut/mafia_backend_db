import express from 'express'
import { getCats } from '../controller/cat.controller.js'

export const router = new express.Router()

router.get('/cat', getCats)