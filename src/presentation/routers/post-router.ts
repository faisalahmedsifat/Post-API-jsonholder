import express from 'express'
import { Request, Response } from 'express'


export default function PostsRouter(
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const { keyword } = req.query
            if (keyword) {
                res.json({ message: `Keyword received :${keyword}` })
            }
            else
                res.json({ message: "Please add a keyword" })
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    return router
}