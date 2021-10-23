import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import apiRouter from './api/routes';
import 'express-async-errors';

if (process.env.NODE_ENV !== "production") {
    console.log('dot env works');
    dotenv.config();
}

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyparser.json());
app.use('/v1/api', apiRouter);


app.use(async (err, req, res, next) => {
    const status = err.status || 500;
    if (req.app.get('env') === 'development') {
        res.locals.message = err.message;
        res.locals.error = err;
    } else {
        const messages = {
            400: 'bad request',
            401: 'unauthorized',
            403: 'forbidden',
            404: 'not found',
            500: 'internal server error',
        };
        res.locals.message = messages[status] || 'error';
    }

    res.status(status);
    res.json({
        msg: res.locals.message,
        trace: res.locals.error,
    });
});

app.listen(port, () => console.log(`listening on port: ${port}`))
