import { useEffect, useState } from 'react';
import { graphColors7 } from '../../resources/colors'
import PieChart from '../Charts/PieChart'
import "./IssuesItem.css"


interface IssuesStatistics {
  [key: string]: number
}

interface PropType {
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
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <PieChart data={issuesStatistics} width={props.width} height={props.height}
           noDataLabel="No closed issues and requests" colors={graphColors7}/>
        </>}
      </div>
    </div>
  );
}

export default IssuesPullsStat