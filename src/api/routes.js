import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', async (req, res, next) => {
    const { query } = req;
    console.log(query);
    res.status(200).send('hello get api');
});

apiRouter.post('/', async (req, res, next) => {
    const { body } = req;
    console.log(body);
    res.status(200).send('hello post api');
});

export default apiRouter;
