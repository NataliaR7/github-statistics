const express = require('express');
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');
const { Octokit } = require('@octokit/rest');
const DatabaseLogic = require('./databaseLogic');
const extensions = require('./extensions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    if (octokit.auth.name === '') {
        octokit = new Octokit({
            auth: req.cookies.token,
        });
    }
    next();
});

app.post('/login', (req, res) => {
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
            if (err.status === 404) {
                res.send(404);
            }
        });
});

app.post('/compareNickname', (req, res) => {
    octokit
        .request('GET /users/{username}', {
            username: req.body.nickname,
        })
        .then((result) => {
            res.send(200);
        })
        .catch((err) => {
            if (err.status === 404) {
                res.send(404);
            }
        });
});

app.get('/user', (req, res) => {
    const currentUser = `${req.query.username || req.cookies.currentNickname}`.toLowerCase();
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
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/starred?per_page=1', {
            username: currentUser,
        })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => console.log(err, 'starredErr'));
});

app.get('/orgs', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/orgs', {
            username: currentUser,
        })
        .then((result) => {
            return Promise.all(extensions.getDetailedOrganizationPromises(result.data, octokit));
        })
        .then((result) => {
            const orgs = result.map((response) => response.data);
            res.json(orgs);
        })
        .catch((err) => console.log(err, 'orgErr'));
});

app.get('/repos', (req, res) => {
    const additionalReposInfo = new Map();
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((response) => {
            if (response.repositories && extensions.isDataActual(Number(response['repos_last_update']))) {
                res.send(response.repositories);
                return Promise.reject('toDatabase');
            }
            return Promise.resolve(response);
        })
        .then((response) => {
            const currEtag = response.e_tags;
            return getRepositoriesData(currentUser, currEtag)
                .then((result) => {
                    return getDetailedRepositoriesData(currentUser, result, res);
                })
                .catch((err) => {
                    if (err.status === 304) {
                        res.send(response.repositories);
                        return Promise.reject('notModified');
                    }
                    console.log(err, 'reposDet');
                });
        })
        .then((repositories) => {
            Promise.all(extensions.getLanguagesDataPromises(repositories, currentUser, octokit))
                .then((languagesData) => {
                    database.updateUserLanguages(currentUser, extensions.getLanguageStatistic(languagesData));
                    return languagesData;
                })
                .then((languages) => {
                    getContributors(currentUser, additionalReposInfo, repositories, languages);
                })
                .catch((err) => console.log(err, 'additReposErr'));
        })
        .catch((err) => {
            console.log(err, 'repos');
        });
});

app.get('/activity', (req, res) => {
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
                        let activityData = activityParser.getActivityStatistics(result.data);
                        database.updateUserActivity(currentUser, activityData);
                        res.json(activityData);
                    });
            }
        })
        .catch((err) => console.log(err, 'activity'));
});

app.get('/userRecentActivity', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    octokit
        .request('GET /users/{username}/events', {
            username: currentUser,
            per_page: 100,
        })
        .then((result) => {
            res.json(result.data);
        })
        .catch((err) => console.log(err));
});

app.get('/repoRecentActivity', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    const repo = req.query.repo;
    octokit
        .request('GET /repos/{owner}/{repo}/events', {
            owner: currentUser,
            repo: repo,
            per_page: 100,
        })
        .then((result) => {
            res.json(result.data);
        })
        .catch((err) => console.log(err));
});

app.post('/reposlangs', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    extensions
        .getReposLanguagesPromise(req.body.reposName, currentUser, octokit)
        .then((result) => {
            res.json(extensions.getLanguageStatistic([result]));
        })
        .catch((err) => console.log(err));
});

app.get('/userlangs', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((result) => {
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
            res.json(extensions.getOpenClosed(response.data.filter((data) => !data['pull_request'])));
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
    const currentUser = req.query.username || req.cookies.currentNickname;
    database
        .getUser(currentUser)
        .then((result) => {
            res.send(result.repos_additional_info);
        })
        .catch((err) => console.log(err));
});

app.get('/repo', (req, res) => {
    const currentUser = req.query.username || req.cookies.currentNickname;
    const repoId = req.query.repoId;
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

function getRepositoriesData(currentUser, currEtag) {
    return Promise.all(extensions.getUserReposPromises(currentUser, octokit, 2, currEtag)).then((responses) => {
        let resultData = [];
        for (let response of responses) {
            resultData.push(...response.data);
        }
        return Promise.resolve({ headers: responses[0].headers, data: resultData });
    });
}

function getDetailedRepositoriesData(currentUser, result, res) {
    const resultData = result.data;
    return Promise.all(extensions.getDetailedRepositoryPromises(resultData, currentUser, octokit)).then(
        (repositoriesData) => {
            const repos = repositoriesData.map((response) => response.data);
            const newEtag = result.headers.etag;
            extensions.addRepositoriesToDatabase(database, currentUser, repos, newEtag, true || response);
            res.json(repos);
            return resultData;
        }
    );
}

function getContributors(currentUser, additionalReposInfo, repositories, languages) {
    Promise.allSettled(extensions.getContributorsPromises(repositories, currentUser, octokit)).then(
        (contributorsData) => {
            for (let i = 0; i < contributorsData.length; i++) {
                if (contributorsData[i].status === 'rejected') {
                    continue;
                }
                const dataValue = contributorsData[i].value;
                const repositoryName = `${dataValue.url}`.match(/\/([^/]+)\/contributors/)[1];
                if (!additionalReposInfo.has(repositoryName)) {
                    additionalReposInfo.set(repositoryName, {
                        languages: languages[i].data,
                        contributors: dataValue.data,
                    });
                }
            }

            const resultInfo = [];
            additionalReposInfo.forEach((value, key) => {
                resultInfo.push({ repoName: key, ...value });
            });

            database.updateReposAdditionalInfo(currentUser, resultInfo);
        }
    );
}
