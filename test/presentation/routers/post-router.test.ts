import request from 'supertest'
import express from 'express'
import PostsRouter from '../../../src/presentation/routers/post-router'

const app = express()
app.use(PostsRouter())

describe('GET /', () => {
    it('should respond with a message when keyword is provided', async () => {
        const res = await request(app)
            .get('/')
            .query({ keyword: 'test' })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Keyword received :test')
    })

    it('should respond with a message when keyword is not provided', async () => {
        const res = await request(app)
            .get('/')
            .query({})

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Please add a keyword')
    })
})