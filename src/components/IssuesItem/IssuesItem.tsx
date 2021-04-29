import "./IssuesItem.css";
import { useEffect, useState } from 'react';
import { graphColors7 } from '../../resources/colors';
import PieChart from '../PieChart/PieChart';

interface PropsType {
  reposName: string;
  width?: string;
  height?: string;
  legendPosition?: string;
};

interface IssuesStatistics {
  [key: string]: number;
}

const IssuesItem: React.FC<PropsType> = props => {
  const [issuesStatistics, setIssuesStatistics] = useState<IssuesStatistics>({});

  useEffect(() => {
    getIssuesData(props.reposName).then((res) => {
      setIssuesStatistics(res);
    });
  }, [])

  return (
    <div className="userIssues">
      <div className="issuesStatistics">
        {issuesStatistics && <>
          <PieChart data={issuesStatistics} width={props.width} height={props.height}
            noDataLabel="No closed issues and requests" colors={graphColors7} />
        </>}
      </div>
    </div>
  );
}

async function getIssuesData(reposName: string) {
  return await (await fetch(`/repoIssuesPullsClose`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ reposName: `${reposName}` })
  })).json();
}

export default IssuesItem;