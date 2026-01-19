import express, { Request, Response } from 'express';
import apiRouter from './routes/api';
import dotenv from 'dotenv'
import bodyparser from 'body-parser';
var cors = require('cors')
import { Pool, PoolConfig} from 'pg'




dotenv.config({path: './.env'});
const app = express();
const port = 8080;
app.use(cors())
app.use(express.json())
app.use(bodyparser.json());



const poolOptions: PoolConfig = {
    host: "aws-0-us-west-2.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.haeondhsmdfqflttsiod",
    password: process.env.PGPASSWORD
}

// console.log("options:", poolOptions);

const client = new Pool(poolOptions);
client.connect()


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/api', apiRouter);
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} and address 0.0.0.0`);
});

export default client