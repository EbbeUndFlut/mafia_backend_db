import express from 'express'
import { createNewClan, getClans, getDashboardData, setClanCookie } from '../controller/clan.controller.js'

export const router = new express.Router()

router.get('/clan', getClans)
router.get('/clan/set/:id', setClanCookie)
router.get('/clan/dashboard', getDashboardData)
router.post('/clan/new', createNewClan)