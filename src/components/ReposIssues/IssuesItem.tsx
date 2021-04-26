import { useEffect, useState } from 'react';
import { color, generalColor, graphColors } from '../../resources/colors'
import Chart from 'react-apexcharts';
import {GetLablesAndValues} from "../../extentions/extentions"
import "./IssuesItem.css"


let options =(labels: string[]) => {
  return {
    chart: {
      type: 'pie',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        offsetY: 10,        
      }
    },
    noData: {
      text: "No issues and pull requests",
      align: 'center',
      verticalAlign: 'top',
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

type PropType = {
  reposName: string
};

function IssuesPullsStat(props: PropType){
  const [issuesStatistics, setIssuesStat] = useState<IssuesStatistics>({})

  async function getIssuesData() {
    const repositoryIssues = await (await fetch(`/repoIssuesPullsClose`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({reposName: `${props.reposName}`})
    })).json()
    setIssuesStat(repositoryIssues)
  }
  
  useEffect(() => {
    getIssuesData()
  }, [])
  

  let parsedData = GetLablesAndValues(issuesStatistics)
  return (
    <div className="userIssues">
      <div className="head">
        <span>Close issues and pull requests statistics</span>
      </div>
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <Chart options={options(parsedData.lables)} series={parsedData.values} type="pie" width={"300"} />          
        </>}
      </div>
    </div>
  );
}

export default IssuesPullsStat