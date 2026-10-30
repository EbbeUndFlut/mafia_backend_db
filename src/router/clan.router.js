import express from 'express'

export const router = new express.Router()

router.get('/clan', (req, res) => {
    res.sendStatus(418)
})