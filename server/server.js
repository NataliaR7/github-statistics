// import express from 'express';
// import { createOAuthAppAuth } from "@octokit/auth-oauth-app"
// import { Octokit } from "@octokit/rest"

const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = createOAuthAppAuth({
    clientId: '9607ea01165c834b3511',
    clientSecret: '51a30d03adf6e116993b0a9ced74a44602b66710',
    redirectUrl: 'http://localhost:3000/login',
});

const app = express();
const port = 3001;
let octokit = new Octokit();
let user = 'nulladdict';

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    if (octokit.auth.name === '') {
        octokit = new Octokit({
            auth: req.cookies.token,
        });
        console.log('octokit');
    }
    next();
});

app.post('/login', (req, res) => {
    console.log('post /login');
    const code = req.body.code;
    const tokenAuthentication = auth({
        type: 'token',
        code: code,
    });
    tokenAuthentication
        .then((result) => {
            octokit = new Octokit({
                auth: result.token,
            });
            res.cookie('token', result.token);
            res.cookie('isLoggedIn', 'true');
            res.code(200);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post('/nickname', (req, res) => {
    console.log('post /nickname');
    //console.log(req, 'post /nickname');
    res.cookie('currentNickname', req.body.nickname);
    user = req.body.nickname;
    //console.log(res.code);
    res.code(200);
});

let etag = '';
let cache = {};

app.get('/user', (req, res) => {
    console.log('get /user');
    octokit
        .request('GET /users/{username}', {
            username: req.cookies.currentNickname,
            headers: {
                'If-None-Match': etag,
            },
        })
        .then((result) => {
            console.log(result.headers);
            console.log(result.data, "11111111111111");
            etag = result.headers.etag;
            cache = result.data;
            res.json(result.data);
        })
        .catch((err) => {
            //console.log(result.headers);
            console.log(err, "ERR");
            if(err.status === 304){
                console.log("ERR1");
                res.json(cache);
            }

        });
});

app.get('/starred', (req, res) => {
    console.log('get /starred');
    octokit
        .request('GET /users/{username}/starred?per_page=1', {
            username: user,
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-used'], "starred");
            res.json(result);
        });
});

app.get('/orgs', (req, res) => {
    console.log('get /orgs');
    octokit
        .request('GET /users/{username}/orgs', {
            username: user,
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-used'], "orgs");
            res.json(result.data);
        });
});

app.get('/repos', (req, res) => {
    octokit
        .request('GET /users/{username}/repos', {
            username: user,
        })
        .then((result) => {
            res.json(result.data);
        });
});

app.get('/activity', (req, res) => {
    octokit
        .request('GET /users/{username}/events', {
            username: user,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "activity");
            console.log(result.data, "activ")
            res.json(result.data);
        });
});

app.post("/reposlang", (req, res) => {
    octokit
        .request('GET /repos/{username}/{name}/languages', {
            username: user,
            name: req.body.reposName
        })
        .then((result) => {
            //console.log(result.headers['x-ratelimit-used'], "reposlang", req.body.reposName);
            res.json(result.data);
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
