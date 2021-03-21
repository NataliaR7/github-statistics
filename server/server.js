// import express from 'express';
// import { createOAuthAppAuth } from "@octokit/auth-oauth-app"
// import { Octokit } from "@octokit/rest"

const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = createOAuthAppAuth({
    clientId: 'a53c785b082e97521c98',
    clientSecret: '66956b1c638c8b4372e90b76a2ff7dd0506c9db1',
    redirectUrl: 'http://localhost:3000/main/login',
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
    console.log(req, 'post /nickname');
    res.cookie('currentNickname', req.body.nickname);
    user = req.body.nickname;
    res.code(200);
});

let etag = '';
let cache = {};

app.get('/user', (req, res) => {
    console.log('get /user');
    octokit
        .request('GET /users/{username}', {
            username: user,
            headers: {
                'If-None-Match': etag,
            },
        })
        .then((result) => {
            console.log(result.headers);
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

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.get('/repos', (req, res) => {
    octokit
        .request('GET /users/{username}/repos', {
            username: user,
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-used'], "repos");
            console.log(result.headers);
            res.json(result.data);
        });
});
// https://github-contributions.now.sh/api/v1/vabyars
app.get('/activity', (req, res) => {
    octokit
        .request('https://api.github.com/users/vabyars/events', {
            username: user,
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-used'], "activity");
            console.log(result.data)
            // res.json(result.data);
        });
});

app.post("/reposlang", (req, res) => {
    octokit
        .request('GET /repos/{username}/{name}/languages', {
            username: user,
            name: req.body.reposName
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-used'], "reposlang", req.body.reposName);
            res.json(result.data);
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});