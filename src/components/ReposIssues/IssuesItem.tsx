import { useEffect, useState } from 'react';
import { color, generalColor, graphColors7 } from '../../resources/colors'
import Chart from 'react-apexcharts';
import { GetLablesAndValues } from "../../extentions/extentions"
import "./IssuesItem.css"


let options = (labels: string[]) => {
  return {
    chart: {
      type: 'pie',
      width: 300,
      height: 150,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        // offsetY: 10,        
      }
    },
    animations: {
      enabled: true,
    },
    // noData: {
    //   text: "No issues and pull requests",
    //   align: 'center',
    //   verticalAlign: 'top',
    // },
    noData: {
      text: 'No issues and pull requests',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: "#888888",
        fontSize: '1vw',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif`
      },
    },
    colors: graphColors7,
    labels: labels,
    legend: {
      offsetX: -10,
      horizontalAlign: 'left',
      // verticalAlign: 'center',
      fontSize: '17em',
      itemMargin: {
        vertical: 5,
      },
      formatter: function (seriesName: any, opts: any) {
        return [" " + seriesName]
      },
    },
    responsive: [{
      breakpoint: 1700,
      options: {
        chart: {
          width: 450,
          height: 250
        },
      },
    },
    {
      breakpoint: 1000,
      options: {
        chart: {
          width: 300,
          height: 150
        },
      },
    }]
  }
};


interface IssuesStatistics {
  [key: string]: number
}

type PropType = {
  reposName: string
};

function IssuesPullsStat(props: PropType) {
  const [issuesStatistics, setIssuesStat] = useState<IssuesStatistics>({})

  async function getIssuesData() {
    const repositoryIssues = await (await fetch(`/repoIssuesPullsClose`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ reposName: `${props.reposName}` })
    })).json()
    setIssuesStat(repositoryIssues)
  }

  useEffect(() => {
    getIssuesData()
  }, [])


  let parsedData = GetLablesAndValues(issuesStatistics)
  return (
    <div className="userIssues">
      {/* <div className="head">
        <span>Close issues and pull requests statistics</span>
      </div> */}
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <Chart options={options(parsedData.lables)} series={parsedData.values} type="pie" width={"460"} height={"250"} />
        </>}
      </div>
    </div>
  );
}

export default IssuesPullsStat