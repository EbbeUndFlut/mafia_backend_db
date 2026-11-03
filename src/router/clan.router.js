import express from 'express'
import { createNewClan, getClans } from '../controller/clan.controller.js'

export const router = new express.Router()

router.get('/clan', getClans)

router.post('/clan/new', createNewClan)