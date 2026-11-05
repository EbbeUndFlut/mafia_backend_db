import express from 'express'
import { getAllRegions, changeOwner } from '../controller/region.controller.js'

export const router = new express.Router()

router.get('/region', getAllRegions)
router.put('/region/:id', changeOwner)