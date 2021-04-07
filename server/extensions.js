

function addRepositoriesToDatabase(database, username, repositories, isUserExist){
    if (isUserExist){
        database.updateUserRepositories(username, repositories)
    } else {
        database.insertUserRepositories(username, repositories)
        console.log("НЕ ХОДИ СЮДА")
    }
}

function addUserDataToDatabase(database, username, data, isUserExist){
    if (isUserExist){
        database.updateUserData(username, data)
    } else {
        database.insertUserData(username, data)
    }
}

function isDataActual(lastDateInMilliseconds){
    const delay =  5 * 60 * 1000
    return Date.now() - lastDateInMilliseconds < delay
}

function getLanguageStatistic(responses){
    let languageStatistic = {}
    for (let response of responses){
        let reposLanguages = response.data
        for (let key in reposLanguages){
            if (!languageStatistic[key])
                languageStatistic[key] = reposLanguages[key]
            else
                languageStatistic[key] += reposLanguages[key]
          }
    }
    return languageStatistic
}

function getLanguagesDataPromises(repos, user, octokit){
    let res = [];
    
    for (let rep of repos){
        res.push(
            octokit
            .request('GET /repos/{username}/{reposName}/languages', {
                username: user,
                reposName: rep.name
            }))
    } 
    return res;
}

function getContributorsPromises(repos, user, octokit){
    let res = [];
    
    for (let rep of repos){
        res.push(
            octokit
            .request('GET /repos/{username}/{reposName}/contributors', {
                username: user,
                reposName: rep.name
            }))
    } 
    return res;
}

function getDetailedRepositoryPromises(repos, user, octokit) {
    let res = [];
    
    for (let rep of repos){
        res.push(
            octokit
            .request('GET /repos/{username}/{reposName}', {
                username: user,
                reposName: rep.name
            }));
    } 
    return res;
}

module.exports = {
    addRepositoriesToDatabase: addRepositoriesToDatabase,
    isDataActual: isDataActual,
    getLanguageStatistic: getLanguageStatistic,
    getLanguagesDataPromises: getLanguagesDataPromises,
    addUserDataToDatabase,
    getDetailedRepositoryPromises,
    getContributorsPromises
}

