import { useEffect, useState } from 'react';
import { color, generalColor, graphColors } from '../../resources/colors'
import Chart from 'react-apexcharts';
import {GetLablesAndValues} from "../../extentions/extentions"
import "./IssuesItem.css"


let options =(labels: string[]) => {
  return {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,        
      }
    },
    color: graphColors,
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
};


interface IssuesStatistics {
  [key: string]: number
}

const day = 1000 * 60 * 60 * 24 
const daysInWeek = 7
const daysInMonth = 30

function parseIssuesData(data: {[key: string]: string}[]): IssuesStatistics{
  let issuesStat = {
    "week": 0,
    "month": 0,
    "later": 0,
    "open": 0
  }
  for (let issue of data){
    if (issue["state"] === "open")
      issuesStat["open"] += 1 
    else if (issue["state"] === "closed"){
      let dateOpen = new Date(issue["created_at"])
      let dateClose = new Date(issue["closed_at"])
      let closingTimeInDays = getDatesDifferenceInDays(dateOpen, dateClose)     
      if (closingTimeInDays <= daysInWeek)
        issuesStat["week"] += 1
      else if (closingTimeInDays <= daysInMonth)
        issuesStat["month"] += 1
      else 
        issuesStat["later"] += 1
    }
  }
  return issuesStat
}

function getDatesDifferenceInDays(dateOpen: Date, dateClose: Date){
  return Math.floor((dateClose.getTime() - dateOpen.getTime()) / day)
}

type PropType = {
  url: string,
  type: string,
  reposName: string
};

function Issues(props: PropType){
  const [issuesStatistics, setIssuesStat] = useState<IssuesStatistics>({})
  const [labelData, setLabel] = useState("")

  async function getIssuesData() {
    const repositoryIssues = await (await fetch(`/${props.url}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({reposName: `${props.reposName}`})
    })).json()
    setLabel(`Statistics for the last ${repositoryIssues.length} ${props.type}`)
    setIssuesStat(parseIssuesData(repositoryIssues))
  }
  useEffect(() => {
    getIssuesData()
  }, [])
  

  let parsedData = GetLablesAndValues(issuesStatistics)
  return (
    <div className="userIssues">
      <div className="head">
        <span>{labelData}</span>
      </div>
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <Chart options={options(parsedData.lables)} series={parsedData.values} type="donut" width={"300"} />          
        </>}
      </div>
    </div>
  );
}

export default Issues