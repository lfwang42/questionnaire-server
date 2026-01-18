"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_1 = require("./routes/api");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var cors = require('cors');
var pg_1 = require("pg");
dotenv_1.default.config({ path: './.env' });
var app = (0, express_1.default)();
var port = 8080;
app.use(cors());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
var client = new pg_1.Pool({
    host: "aws-0-us-west-2.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.haeondhsmdfqflttsiod",
    password: process.env.PGPASSWORD
});
client.connect();
app.get('/', function (req, res) {
    res.send('Hello, TypeScript Express!');
});
app.use('/api', api_1.default);
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(8080));
});
exports.default = client;
