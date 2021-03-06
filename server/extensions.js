function addRepositoriesToDatabase(database, username, repositories, eTags, isUserExist) {
    if (isUserExist) {
        database.updateUserRepositories(username, repositories, eTags);
    }
}

function addUserDataToDatabase(database, username, data, isUserExist) {
    if (isUserExist) {
        database.updateUserData(username, data);
    } else {
        database.insertUserData(username, data);
    }
}

function isDataActual(lastDateInMilliseconds) {
    const delay = 5 * 60 * 1000;
    return Date.now() - lastDateInMilliseconds < delay;
}

function getLanguageStatistic(responses) {
    let languageStatistic = {};
    for (let response of responses) {
        let reposLanguages = response.data;
        for (let key in reposLanguages) {
            if (!languageStatistic[key]) languageStatistic[key] = reposLanguages[key];
            else languageStatistic[key] += reposLanguages[key];
        }
    }
    return sortLanguageByFrequency(languageStatistic);
}

function sortLanguageByFrequency(languageStatistic) {
    let statisticArray = [];
    for (let key in languageStatistic) {
        statisticArray.push({ language: key, bytes: languageStatistic[key] });
    }
    statisticArray.sort((prev, next) => next.bytes - prev.bytes);
    let mostPopularLanguages = statisticArray.splice(0, 5);
    let otherLanguagesBytes = statisticArray.reduce((acc, item) => (acc += item.bytes), 0);
    if (otherLanguagesBytes != 0) mostPopularLanguages.push({ language: 'Другое', bytes: otherLanguagesBytes });

    let res = {};
    for (let data of mostPopularLanguages) res[data.language] = data.bytes;
    return res;
}

function getLanguagesDataPromises(repositories, user, octokit) {
    let res = [];

    for (let repos of repositories) {
        res.push(getReposLanguagesPromise(repos.name, user, octokit));
    }
    return res;
}

function getReposLanguagesPromise(reposName, user, octokit) {
    return octokit.request('GET /repos/{username}/{reposName}/languages', {
        username: user,
        reposName: reposName,
    });
}

function getContributorsPromises(repos, user, octokit) {
    let res = [];

    for (let rep of repos) {
        res.push(
            octokit.request('GET /repos/{username}/{reposName}/contributors', {
                username: user,
                reposName: rep.name,
            })
        );
    }
    return res;
}

function getDetailedRepositoryPromises(repos, user, octokit) {
    let res = [];

    for (let rep of repos) {
        res.push(
            octokit.request('GET /repos/{username}/{reposName}', {
                username: user,
                reposName: rep.name,
            })
        );
    }
    return res;
}

function getDetailedOrganizationPromises(orgs, octokit) {
    let res = [];
    for (let org of orgs) {
        res.push(
            octokit.request('GET /orgs/{org}', {
                org: org.login,
            })
        );
    }
    return res;
}

function getIssuesPromises(repos, user, octokit) {
    let res = [];
    for (let i = 1; i < 3; i++)
        res.push(
            octokit.request('GET /repos/{username}/{reposName}/issues', {
                username: user,
                reposName: repos,
                state: 'all',
                per_page: 100,
                page: i,
            })
        );
    return res;
}
const day = 1000 * 60 * 60 * 24;
const daysInWeek = 7;
const daysInMonth = 30;

function parseIssuesData(data) {
    let issuesStat = {
        'Closed in week': 0,
        'Closed in month': 0,
        Longer: 0,
    };

    for (let issue of data) {
        if (issue['state'] === 'closed') {
            let dateOpen = new Date(issue['created_at']);
            let dateClose = new Date(issue['closed_at']);
            let closingTimeInDays = getDatesDifferenceInDays(dateOpen, dateClose);
            if (closingTimeInDays <= daysInWeek) updateIssuesStatistics(issuesStat, 'Closed in week');
            else if (closingTimeInDays <= daysInMonth) updateIssuesStatistics(issuesStat, 'Closed in month');
            else updateIssuesStatistics(issuesStat, 'Longer');
        }
    }

    for (let key in issuesStat) if (issuesStat[key] === 0) delete issuesStat[key];
    return issuesStat;
}

function updateIssuesStatistics(statistics, field) {
    if (!statistics[field]) statistics[field] = 0;
    statistics[field] += 1;
}

function getOpenClosed(responseData) {
    let open = 0;
    let closed = 0;
    for (let data of responseData) {
        if (data['state'] === 'open') open += 1;
        else closed += 1;
    }
    return { open, closed };
}

function getUserReposPromises(user, octokit, pageCount, currEtag) {
    let res = [];
    for (let i = 1; i <= pageCount; i++) {
        res.push(
            octokit.request('GET /users/{username}/repos', {
                username: user,
                per_page: 100,
                headers: {
                    'If-None-Match': currEtag,
                },
                page: i,
            })
        );
    }
    return res;
}

function getDatesDifferenceInDays(dateOpen, dateClose) {
    return Math.floor((dateClose.getTime() - dateOpen.getTime()) / day);
}

function parseIssues(responces) {
    let res = [];
    for (let responce of responces) {
        res.push(...responce.data);
    }
    return parseIssuesData(res);
}

module.exports = {
    addRepositoriesToDatabase: addRepositoriesToDatabase,
    isDataActual: isDataActual,
    getLanguageStatistic: getLanguageStatistic,
    getLanguagesDataPromises: getLanguagesDataPromises,
    addUserDataToDatabase,
    getDetailedRepositoryPromises,
    getContributorsPromises,
    getReposLanguagesPromise,
    parseIssues,
    getIssuesPromises,
    getOpenClosed,
    getDetailedOrganizationPromises,
    getUserReposPromises,
};
