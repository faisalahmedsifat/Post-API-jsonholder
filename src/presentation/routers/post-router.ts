import express, { Request, Response } from 'express';
import axios from 'axios';

import { CreateUserActionUseCase } from '../../domain/interfaces/use-cases/create-user-action-use-case';



export default function PostsRouter(
    createUserActionUseCase: CreateUserActionUseCase,
) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const { keyword } = req.query;

            if (!keyword) {
                return res.status(404).json({ message: 'Please add a keyword' });
            }

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const posts = response.data;

            const matchedPosts = posts.filter((post: any) =>
                post.title.includes(keyword as string) || post.body.includes(keyword as string),
            );

            const userActionRequestModel = {
                keyword: keyword as string,
                browser: req.headers['user-agent'] as string,
                posts: matchedPosts,
            };

            
            const result = await createUserActionUseCase.execute(userActionRequestModel);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).send({ message: 'Error fetching data' });
        }
    });

    return router;
}