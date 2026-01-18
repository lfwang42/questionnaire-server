import express from 'express'
import cors, { CorsOptions } from 'cors'
const app = express();

app.use(cors());
const apiRouter = express.Router();
import { imageRouter } from './image';


apiRouter.use('/images', imageRouter);

export default apiRouter;