

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
    const delay = 30 * 1000
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
    let res = statisticArray.splice(0, 5);
    let otherLanguagesBytes = statisticArray.reduce((acc, item) => acc += item.bytes, 0)
    if (otherLanguagesBytes != 0)
        res.push({language: "Другое", bytes: otherLanguagesBytes})
    return res
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

module.exports = {
    addRepositoriesToDatabase: addRepositoriesToDatabase,
    isDataActual: isDataActual,
    getLanguageStatistic: getLanguageStatistic,
    getLanguagesDataPromises: getLanguagesDataPromises,
    addUserDataToDatabase
}

