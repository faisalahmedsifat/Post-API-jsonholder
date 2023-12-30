import request from 'supertest';
import express, { Application } from 'express';
import axios from 'axios';
import PostsRouter from '../../../src/presentation/routers/post-router';

jest.mock('axios');

describe('SearchRouter', () => {
    let app: Application;
    let mockUseCase: { execute: jest.Mock };

    beforeEach(() => {
        jest.clearAllMocks();
        app = express();
        mockUseCase = {
            execute: jest.fn(),
        };
        app.use('/search', PostsRouter(mockUseCase));
    });

    it('should return 404 if no keyword is provided', async () => {
        const res = await request(app).get('/search');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: 'Please add a keyword' });
    });

    it('should return 201 and call use case with correct parameters if keyword is provided', async () => {
        const mockPosts = [{ id: 1, title: 'test', body: 'test' }];
        const mockResponse = { data: mockPosts };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);
        mockUseCase.execute.mockResolvedValue(mockPosts);
        const res = await request(app)
            .get('/search')
            .set('User-Agent', 'test agent')
            .query({ keyword: 'test' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockPosts);
        expect(mockUseCase.execute).toHaveBeenCalledWith({
            keyword: 'test',
            browser: 'test agent',
            posts: mockPosts,
        });
    });

    it('should return 500 if an error occurs', async () => {
        mockUseCase.execute.mockRejectedValue(new Error('Test error'));
        const res = await request(app).get('/search').query({ keyword: 'test' });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ message: 'Error fetching data' });
    });

    it('should return a JSON object', async () => {
        const mockPosts = [
            { id: 1, title: 'test', body: 'test' , userId: 1},
            { id: 2, title: 'apple', body: 'orange' , userId: 2},
            { id: 3, title: 'banana', body: 'guava' , userId: 3},
            { id: 4, title: 'apple', body: 'mango' , userId: 4},
        ];

        const expectedResponse = [
            { id: 2, title: 'apple', body: 'orange' , userId: 2},
            { id: 4, title: 'apple', body: 'mango' , userId: 4},
        ];

        (axios.get as jest.Mock).mockResolvedValue({ data: mockPosts });

        mockUseCase.execute.mockResolvedValue(mockPosts);

        const res = await request(app)
            .get('/search')
            .set('User-Agent', 'test agent')
            .query({ keyword: 'apple' });

        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expectedResponse);

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/');
        expect(mockUseCase.execute).toHaveBeenCalledWith({
            keyword: 'apple',
            browser: 'test agent',
            posts: expectedResponse,
        });
    });

    // should return 503 if the response from the external API is not an array
    it('should return 503 if the response from the external API is not an array', async () => {
        const mockPosts = { id: 1, title: 'test', body: 'test' };
        const mockResponse = { data: mockPosts };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);
        mockUseCase.execute.mockResolvedValue(mockPosts);
        const res = await request(app)
            .get('/search')
            .set('User-Agent', 'test agent')
            .query({ keyword: 'test' });
        expect(res.statusCode).toEqual(503);
        expect(res.body).toEqual({ message: 'Invalid response from External API' });
    });
});