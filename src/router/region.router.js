import express from 'express'
import { getAllRegions } from '../controller/region.controller.js'

export const router = new express.Router()

router.get('/region', getAllRegions)