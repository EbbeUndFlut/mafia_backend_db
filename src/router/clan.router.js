import express from 'express'
import { createNewClan } from '../controller/clan.controller.js'

export const router = new express.Router()

router.get('/clan', (req, res) => {
    res.sendStatus(418)
})

router.post('/clan/new', createNewClan)