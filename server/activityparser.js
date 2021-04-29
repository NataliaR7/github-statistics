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
    let tempMonthStat = {}
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
      tempMonthStat[day] = data.count

      if (MONTHNAMES[month] != tempMonthName){
        result[tempMonthName] = tempMonthStat 
        tempMonthName = MONTHNAMES[month]         
        tempMonthStat = {}
      }
    }

    if (tempMonthStat != {})
      result[tempMonthName] = tempMonthStat 
    return result
  }
 const MONTHNAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
 ];

  function isDateSuitable(now, yearAgo, comparableDate){
    return  comparableDate >= yearAgo && comparableDate <= now
  }

  module.exports = {
    getActivityStatistics: getActivityStatistics
  }