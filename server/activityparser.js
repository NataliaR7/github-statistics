function filterActualActivity(activData){
    let currentDate = new Date()
    let yearAgoDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1, 5)
    let result = []
    for (let data of activData.contributions)
    {
      if (isDateSuitable(currentDate, yearAgoDate, new Date(data.date))){
        result.push(data)
      }
    }
    return result
  }

  function getActivityStatistics(activityData){
    let actualActivityData = filterActualActivity(activityData)
    let result= {}
    let tempMonthStat = defaultMonthStatistics()
    let parts = Object.keys(tempMonthStat)
    let tempMonthName = ""
    let isFirst = true
    for (let data of actualActivityData.reverse()){

      let date = new Date(data.date)
      let month = date.getMonth()
      let day = date.getDate()
      if (isFirst){
        tempMonthName = MONTHNAMES[month]
        isFirst = false
      }
      let partOfMonth = parts[getPartNumber(day)] 
      tempMonthStat[partOfMonth] += data.count

      if (MONTHNAMES[month] != tempMonthName){
        result[tempMonthName] = tempMonthStat 
        
        tempMonthName = MONTHNAMES[month]         
        tempMonthStat = defaultMonthStatistics()
      }
    }

    if (tempMonthStat != defaultMonthStatistics())
      result[tempMonthName] = tempMonthStat 
    return result
  }

  function getPartNumber(day){
    let weekIndex = Math.floor(day / DAYSINWEEK)
    return Math.min(weekIndex, 3)
  }

  function defaultMonthStatistics(){
    return {
      "0-7": 0,
      "8-13": 0,
      "14-20": 0,
      "21-конец": 0
     }
  }

  const DAYSINWEEK = 7
  const MONTHNAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
 ];

  function isDateSuitable(now, yearAgo, comparableDate){
    return  comparableDate >= yearAgo && comparableDate <= now
  }

  module.exports = {
    getActivityStatistics: getActivityStatistics
  }