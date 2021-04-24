

function addRepositoriesToDatabase(database, username, repositories, isUserExist){
    console.log(isUserExist, "response4")
    if (isUserExist){
        database.updateUserRepositories(username, repositories)
    } else {
        //database.insertUserRepositories(username, repositories)
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
    const delay = 5 * 60 * 1000
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
    
    return sortLanguageByFrequency(languageStatistic)
}

function sortLanguageByFrequency(languageStatistic){
    let statisticArray = []
    for (let key in languageStatistic){
        statisticArray.push({language: key, bytes: languageStatistic[key]})
    }
    statisticArray.sort((prev, next) => next.bytes - prev.bytes)
    let mostPopularLanguages = statisticArray.splice(0, 5);
    let otherLanguagesBytes = statisticArray.reduce((acc, item) => acc += item.bytes, 0)
    if (otherLanguagesBytes != 0)
        mostPopularLanguages.push({language: "Другое", bytes: otherLanguagesBytes})
    
    let res = {}
    for (let data of mostPopularLanguages)
        res[data.language] = data.bytes    
    return res
}

function getLanguagesDataPromises(repositories, user, octokit){
    let res = [];
    
    for (let repos of repositories){
        res.push(getReposLanguagesPromise(repos.name, user, octokit))
    } 
    console.log(res)
    return res;
}

function getReposLanguagesPromise(reposName, user, octokit){
    return octokit
    .request('GET /repos/{username}/{reposName}/languages', {
        username: user,
        reposName: reposName
    })
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
    getContributorsPromises,
    getReposLanguagesPromise
}

