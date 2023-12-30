import express, { Request, Response } from 'express';
import axios from 'axios';
import { CreateUserActionUseCase } from '../../domain/interfaces/use-cases/create-user-action-use-case';
import { CustomError, removeQuotationMarks } from '../../utils';

// Function to fetch posts from an external API
async function fetchPosts(): Promise<any[]> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/');
    const posts = response.data;

    if (!Array.isArray(posts)) {
        throw new CustomError(503, 'Invalid response from External API');
    }

    return posts;
}

// Function to filter posts based on a keyword
function filterPosts(posts: any[], keyword: string): any[] {
    return posts.filter(post =>
        post.title.includes(keyword) || post.body.includes(keyword),
    );
}

// Exporting the PostsRouter function as default
export default function PostsRouter(
    createUserActionUseCase: CreateUserActionUseCase,
) {
    const router = express.Router();

    // Route handler for GET / endpoint
    router.get('/', async (req: Request, res: Response, next: Function) => {
        try {
            let { keyword } = req.query;

            if (!keyword || keyword === '') {
                throw new CustomError(404, 'Please add a keyword');
            }

            keyword = removeQuotationMarks(keyword as string);

            const posts = await fetchPosts();
            const matchedPosts = filterPosts(posts, keyword);

            const userActionRequestModel = {
                keyword,
                browser: req.get('user-agent') as string,
                posts: matchedPosts,
            };
            if(matchedPosts.length > 0){
                const result = await createUserActionUseCase.execute(userActionRequestModel);
                // console.log(result);
                if(result)
                    // send the response as json array
                    res.status(201).json(matchedPosts).json();
                else
                    throw new CustomError(200, 'Error uploading to database');
            }else {
                res.status(200).json(matchedPosts).json();
            }
        } catch (err) {
            next(err);
        }
    });

    // Error handling middleware
    router.use((err: any, req: Request, res: Response, next: Function) => {
        if (err instanceof CustomError) {
            res.status(err.status).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Error fetching data' });
        }
    });

    return router;
}