const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const DatabaseLogic = require('./databaseLogic');
const extensions = require('./extensions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { json } = require('express');

const auth = createOAuthAppAuth({
    clientId: '9607ea01165c834b3511',
    clientSecret: '51a30d03adf6e116993b0a9ced74a44602b66710',
    redirectUrl: 'http://localhost:3000/login',
});

const app = express();
const port = 3001;
let octokit = new Octokit();
const database = new DatabaseLogic('./db.sqlite3');

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
    res.send(200);
});

app.get('/user', (req, res) => {
    console.log('get /user');
    const currentUser = req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((response) => {
            if (response && extensions.isDataActual(Number(response['repos_last_update']))) {
                res.send(response['user_data']);
            } else {
                octokit
                    .request('GET /users/{username}', {
                        username: currentUser,
                    })
                    .then((result) => {
                        extensions.addUserDataToDatabase(database, currentUser, result.data, response);
                        res.json(result.data);
                    })
                    .catch((err) => {
                        console.log(err, 'ERR_USER');
                    });
            }
        })
        .catch((err) => console.log(err, 'ERR_USER_DB'));
});

app.get('/starred', (req, res) => {
    console.log('get /starred');
    octokit
        .request('GET /users/{username}/starred?per_page=1', {
            username: req.cookies.currentNickname,
        })
        .then((result) => {
            res.json(result);
        });
});

app.get('/orgs', (req, res) => {
    console.log('get /orgs');
    octokit
        .request('GET /users/{username}/orgs', {
            username: req.cookies.currentNickname,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "orgs");
            res.json(result.data);
        });
});

app.get('/repos', (req, res) => {
    console.log('get /repos');
    const currentUser = req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((response) => {
            //console.log(response, '00');
            if (response.repositories && extensions.isDataActual(Number(response['repos_last_update']))) {
                console.log('1111');
                res.send(response.repositories);
            } else {
                octokit
                    .request('GET /users/{username}/repos', {
                        username: currentUser,
                        per_page: 100,
                    })
                    .then((result) => {
                        console.log(result.headers['x-ratelimit-used'], 'repos');
                        console.log(result.data.length, 'REPOS LENGTH');
                        extensions.addRepositoriesToDatabase(database, currentUser, result.data, response);
                        Promise.all(extensions.getLanguagesDataPromises(result.data, currentUser, octokit)).then(
                            (languagesData) => {
                                database.updateUserLanguages(
                                    currentUser,
                                    extensions.getLanguageStatistic(languagesData)
                                );
                                console.log('222');
                                res.json(result.data);
                            }
                        );
                    });
            }
        })
        .catch((err) => console.log(err, 'repos'));
});

// https://github-contributions.now.sh/api/v1/vabyars
app.get('/activity', (req, res) => {
    console.log('get /activity');
    octokit
        .request('GET /users/{username}/events', {
            username: req.cookies.currentNickname,
            per_page: 100,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "activity");
            // console.log(result.data.length, "Activity length")
            res.json(result.data);
        });
});

app.get('/lang', (req, res) => {
    console.log('get /lang');
    database.getUser(req.cookies.currentNickname).then((result) => {
        console.log(result);
        if (!result) res.json({});
        else res.send(result.languages);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
