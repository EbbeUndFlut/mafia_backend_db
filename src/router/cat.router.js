import express from 'express'

export const router = new express.Router()

router.get('/cat', (req, res) => {
    res.sendStatus(418)
})