//для рефакторинга: методы, в которых просто запрос через octokit вынести.

const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const DatabaseLogic = require('./databaseLogic');
const extensions = require('./extensions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const { idText } = require('typescript');
const activityParser = require('./activityparser');

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
    octokit
        .request('GET /users/{username}', {
            username: req.body.nickname,
        })
        .then((result) => {
            if (result.data.type !== 'User') {
                return Promise.reject({ status: 404 });
            }
            res.cookie('currentNickname', `${req.body.nickname}`.trim().toLowerCase());
            res.send(200);
        })
        .catch((err) => {
            console.log(err, 'ERR_USER');
            if (err.status === 404) {
                res.send(404);
            }
        });
    //res.cookie('currentNickname', req.body.nickname);
    //user = req.body.nickname;
    //console.log(res.code);
    //res.send(200);
});

app.post('/compareNickname', (req, res) => {
    console.log('post /compareNickname');
    octokit
        .request('GET /users/{username}', {
            username: req.body.nickname,
        })
        .then((result) => {
            res.send(200);
        })
        .catch((err) => {
            console.log(err, 'ERR_USER');
            if (err.status === 404) {
                res.send(404);
            }
        });
});

app.get('/user', (req, res) => {
    console.log('get /user ', req.query.username);
    const currentUser = `${req.query.username || req.cookies.currentNickname}`.toLowerCase();
    database
        .getUser(currentUser)
        .then((response) => {
            if (response && extensions.isDataActual(Number(response['repos_last_update']))) {
                console.log('User Database');
                res.send(response['user_data']);
            } else {
                octokit
                    .request('GET /users/{username}', {
                        username: currentUser,
                    })
                    .then((result) => {
                        extensions.addUserDataToDatabase(database, currentUser, result.data, response);
                        console.log('User Octikit');
                        console.log(
                            result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'],
                            'LimitUser'
                        );
                        // console.log('user head', result.headers);
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
    console.log('get /starred ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/starred?per_page=1', {
            username: currentUser,
        })
        .then((result) => {
            console.log(result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'], 'LimitStarred');
            res.json(result);
        })
        .catch((err) => console.log(err, 'starredErr'));
});

app.get('/orgs', (req, res) => {
    console.log('get /orgs ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/orgs', {
            username: currentUser,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "orgs");
            console.log(result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'], 'LimitOrgs');
            res.json(result.data);
        })
        .catch((err) => console.log(err, 'orgErr'));
});

app.get('/repos', (req, res) => {
    console.log('get /repos ', req.query.username);
    const additionalReposInfo = new Map();
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((response) => {
            if (response.repositories && extensions.isDataActual(Number(response['repos_last_update']))) {
                console.log('Repos-database');
                res.send(response.repositories);
                return Promise.reject('toDatabase');
            }
            return Promise.resolve(response);
        })
        .then((response) => {
            // console.log(response.e_tags, 'response');
            const currEtag = response.e_tags;
            console.log(currEtag, 'currEtag');
            // if(currEtag === response['e_tags']) {

            // }

            return (
                octokit
                    .request('GET /users/{username}/repos', {
                        username: currentUser,
                        per_page: 100,
                        headers: {
                            'If-None-Match': currEtag,
                        },
                    })
                    // .catch((err)=>{
                    //     console.log(err, "ошибка!!")
                    // })
                    .then((result) => {
                        const resultData = [];
                        console.log(
                            result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'],
                            'RepoOctokitLimit'
                        );
                        if (result.headers.link) {
                            const nextLink = `${result.headers.link}`.match(/<(.+)>; rel="next"/)[1];
                            return octokit.request(nextLink).then((res) => {
                                resultData.push(...result.data);
                                resultData.push(...res.data);
                                return Promise.resolve({ headers: result.headers, data: resultData });
                            });
                        } else {
                            return Promise.resolve(result);
                        }
                    })
                    .then((result) => {
                        // const forkRepos = resultData.filter((repo)=> repo.fork);
                        // console.log(result, 'result');
                        // console.log(forkRepos.length, 'forkRepos');
                        const resultData = result.data;
                        return Promise.all(
                            extensions.getDetailedRepositoryPromises(resultData, currentUser, octokit)
                        ).then((repositoriesData) => {
                            const repos = repositoriesData.map((response) => response.data);
                            const limit =
                                resultData.length !== 0 &&
                                repositoriesData[repositoriesData.length - 1].headers['x-ratelimit-limit'] -
                                    repositoriesData[repositoriesData.length - 1].headers['x-ratelimit-remaining'];
                            console.log(limit, 'RepoDetailedOctokitLimit');
                            // const newEtag = `${result.headers.etag}`.match(/W\/\"(.+)\"/)[1];
                            const newEtag = result.headers.etag;
                            console.log(newEtag, 'newEtag');
                            extensions.addRepositoriesToDatabase(
                                database,
                                currentUser,
                                repos,
                                newEtag,
                                true || response
                            );
                            res.json(repos);
                            return resultData;
                        });
                    })
                    .catch((err) => {
                        // console.log(
                        //     err.headers['x-ratelimit-limit'] - err.headers['x-ratelimit-remaining'],
                        //     'LimitCacheRepo'
                        // );

                        if (err.status === 304) {
                            console.log('CACHE_Repo');
                            res.send(response.repositories);
                            return Promise.reject('err');
                        }
                        console.log(err, 'reposDet');
                    })
            );
        })
        .then((resultData) => {
            // console.log(resultData, "resultData")
            Promise.all(extensions.getLanguagesDataPromises(resultData, currentUser, octokit))
                .then((languagesData) => {
                    const limit =
                        resultData &&
                        resultData.length !== 0 &&
                        languagesData[languagesData.length - 1].headers['x-ratelimit-limit'] -
                            languagesData[languagesData.length - 1].headers['x-ratelimit-remaining'];
                    console.log(limit, 'LanguagesRepolimit');
                    database.updateUserLanguages(currentUser, extensions.getLanguageStatistic(languagesData));
                    return languagesData;
                })
                .then((languages) => {
                    Promise.allSettled(extensions.getContributorsPromises(resultData, currentUser, octokit)).then(
                        (contributorsData) => {
                            for (let i = 0; i < contributorsData.length; i++) {
                                if (contributorsData[i].status === 'rejected') {
                                    console.log(contributorsData[i].reason);
                                    continue;
                                }
                                // console.log(contributorsData[i], "contributorsData[i]", i);
                                const dataValue = contributorsData[i].value;
                                const repositoryName = `${dataValue.url}`.match(/\/([^/]+)\/contributors/)[1];
                                if (!additionalReposInfo.has(repositoryName)) {
                                    additionalReposInfo.set(repositoryName, {
                                        languages: languages[i].data,
                                        contributors: dataValue.data,
                                    });
                                }
                            }

                            const dataValue1 =
                                contributorsData &&
                                contributorsData[contributorsData.length - 1] &&
                                contributorsData[contributorsData.length - 1].values &&
                                contributorsData[contributorsData.length - 1].value;
                            const limit =
                                dataValue1 &&
                                dataValue1.headers['x-ratelimit-limit'] - dataValue1.headers['x-ratelimit-remaining'];
                            console.log(limit, 'ContributorsRepolimit');

                            const resultInfo = [];
                            additionalReposInfo.forEach((value, key) => {
                                resultInfo.push({ repoName: key, ...value });
                            });

                            database.updateReposAdditionalInfo(currentUser, resultInfo);
                        }
                    );
                })
                .catch((err) => console.log(err, 'additReposErr'));
        })
        .catch((err) => {
            console.log(err, 'repos');
            console.log(
                err.headers && err.headers['x-ratelimit-limit'] - err.headers['x-ratelimit-remaining'],
                'LimitRepo'
            );
        });
});

// https://github-contributions.now.sh/api/v1/vabyars
app.get('/activity', (req, res) => {
    console.log('get /activity ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((response) => {
            if (response.activity && extensions.isDataActual(Number(response['repos_last_update']))) {
                res.send(response.activity);
            } else {
                octokit
                    .request('GET https://github-contributions.now.sh/api/v1/{username}', {
                        username: currentUser,
                    })
                    .then((result) => {
                        console.log(
                            result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'],
                            'LimitActivity'
                        );
                        let activityData = activityParser.getActivityStatistics(result.data);
                        database.updateUserActivity(currentUser, activityData);
                        res.json(activityData);
                    });
            }
        })
        .catch((err) => console.log(err, 'activity'));
});

app.get('/userRecentActivity', (req, res) => {
    console.log('get /userRecentActivity ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/events', {
            username: currentUser,
            per_page: 100,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "activity");
            // console.log(result.data.length, "Activity length")
            console.log(
                result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'],
                'LimitRecentActivityUSER'
            );
            res.json(result.data);
        })
        .catch((err) => console.log(err));
});

app.get('/repoRecentActivity', (req, res) => {
    console.log('get /repoRecentActivity ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    const repo = req.query.repo;
    octokit
        .request('GET /repos/{owner}/{repo}/events', {
            owner: currentUser,
            repo: repo,
            per_page: 100,
        })
        .then((result) => {
            // console.log(result.headers['x-ratelimit-used'], "activity");
            // console.log(result.data.length, "Activity length")
            console.log(
                result.headers['x-ratelimit-limit'] - result.headers['x-ratelimit-remaining'],
                'LimitRecentActivityREPO'
            );
            res.json(result.data);
        })
        .catch((err) => console.log(err));
});

// app.get('/lang', (req, res) => {
//     console.log('get /lang ', req.query.username);
app.post('/reposlangs', (req, res) => {
    console.log('get /reposlangs ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    // console.log(req.body.reposName)
    extensions
        .getReposLanguagesPromise(req.body.reposName, currentUser, octokit)
        .then((result) => {
            res.json(extensions.getLanguageStatistic([result]));
        })
        .catch((err) => console.log(err));
});

app.get('/userlangs', (req, res) => {
    console.log('get /userlangs ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((result) => {
            // console.log(result);
            if (!result) res.json({});
            else res.send(result.languages);
        })
        .catch((err) => console.log(err));
});

app.post('/repoIssuesPullsClose', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    let promises = extensions.getIssuesPromises(req.body.reposName, currentUser, octokit);
    Promise.all(promises).then((responce) => {
        res.json(extensions.parseIssues(responce));
    });
});

app.post('/repoIssuesCount', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /repos/{username}/{reposName}/issues', {
            username: currentUser,
            reposName: req.body.reposName,
            state: 'all',
            per_page: 100,
        })
        .then((response) => {
            res.json(extensions.getOpenClosed(response.data.filter(data => !data["pull_request"])));
        })
        .catch((err) => console.log(err));
});

app.post('/repoPullsCount', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /repos/{username}/{reposName}/pulls', {
            username: currentUser,
            reposName: req.body.reposName,
            state: 'all',
            per_page: 100,
        })
        .then((response) => {
            res.json(extensions.getOpenClosed(response.data));
        })
        .catch((err) => console.log(err));
});

app.get('/repoAdditionalInfo', (req, res) => {
    console.log('get /repoAdditionalInfo ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((result) => {
            res.send(result.repos_additional_info);
        })
        .catch((err) => console.log(err));
});

app.get('/repo', (req, res) => {
    console.log('get /repo ', req.query.username);
    const currentUser = req.query.username || req.cookies.currentNickname;
    const repoId = req.query.repoId;
    // console.log(repoId, 'repoId');
    database
        .getUser(currentUser)
        .then((response) => {
            const repos = JSON.parse(response.repositories);
            const result = repos.find((e) => e.id === +repoId);
            res.json(result);
        })
        .catch((err) => console.log(err, 'repo'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
