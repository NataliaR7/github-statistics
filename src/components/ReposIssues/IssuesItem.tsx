import { useEffect, useState } from 'react';
import { color, generalColor, graphColors } from '../../resources/colors'
import Chart from 'react-apexcharts';
import { GetLablesAndValues } from "../../extentions/extentions"
import LanguagesChart from "../UserLanguages/LanguagesChart"
import "./IssuesItem.css"


interface IssuesStatistics {
  [key: string]: number
}

type PropType = {
  reposName: string,
  width?: string,
  height?: string,
  legendPosition?: string,
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

  return (
    <div className="userIssues">
      <div className="head">
        <span>Close issues and pull requests statistics</span>
      </div>
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <LanguagesChart data={issuesStatistics}  width={props.width} height={props.height} />
        </>}
      </div>
    </div>
  );
}

export default IssuesPullsStat