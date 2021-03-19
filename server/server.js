// import express from 'express';
// import { createOAuthAppAuth } from "@octokit/auth-oauth-app"
// import { Octokit } from "@octokit/rest"

const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const bodyParser = require('body-parser');

const auth = createOAuthAppAuth({
    clientId: '9607ea01165c834b3511',
    clientSecret: 'd1a3275c68271ec88d7920673a3fbf89da40bd5d',
    redirectUrl: 'http://localhost:3000/main/login',
});

const app = express();
const port = 3001;
//let octokit;
let octokit = new Octokit();
const user = 'nulladdict';

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/login', (req, res) => {
    //const { code } = req.body;
    console.log(req.body.code, 'login');
    const code = req.body.code;
    const tokenAuthentication = auth({
        type: 'token',
        code: code,
    });
    tokenAuthentication
        .then((res) => {
            octokit = new Octokit({
                auth: res.token,
            });
            res.code(200);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get('/user', (req, res) => {
    //console.log(octokit, 'octokit');
    octokit
        .request('GET /users/{username}', {
            username: user,
        })
        .then((result) => {
            // console.log(result, 'login');
            // console.log(result.headers, 'login');
            res.json(result.data);
        });
});

app.get('/starred', (req, res) => {
    octokit
        .request('GET /users/{username}/starred?per_page=1', {
            username: user,
        })
        .then((result) => {
            res.json(result);
        });
});

app.get('/orgs', (req, res) => {
    octokit
        .request('GET /users/{username}/orgs', {
            username: user,
        })
        .then((result) => {
            res.json(result.data);
        });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

async function getToken(code) {
    // const appAuthentication = await auth({
    //   type: "oauth-app"
    // });
    const tokenAuthentication = await auth({
        type: 'token',
        code: code,
    });
    return tokenAuthentication.token;
}
