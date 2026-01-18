"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
var cors = require('cors');
const pg_1 = require("pg");
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
const port = 8080;
app.use(cors());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const client = new pg_1.Pool({
    host: "aws-0-us-west-2.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.haeondhsmdfqflttsiod",
    password: process.env.PGPASSWORD
});
client.connect();
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.use('/api', api_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} and address 0.0.0.0`);
});
exports.default = client;
