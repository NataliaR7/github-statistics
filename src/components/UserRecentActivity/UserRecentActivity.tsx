import './UserRecentActivity.css'
import ActivityItem from './ActivityItem'
import { ActivityType } from '../../resources/constants'
import { useEffect, useState } from 'react';
import { count } from 'node:console';

function UserRecentActivity() {
  const [isLoadedData, SetIsLoadedData] = useState(false);
  const [activityData, SetActivityData] = useState<any[]>([]);
  //const [currentYear, SetCurrentYear] = useState(new Date().getFullYear());
  let currentYear = new Date().getFullYear();

  useEffect(() => {
    const activity = fetch("/activity")
      .then(res => res.json())
      .then(result => {
        console.log(result, "ACTIV")
        SetActivityData(activityData => activityData = result);
        SetIsLoadedData(true);
      })
  }, []);

  const activityDataProcessing = () => {
    const result: Map<number, Array<{ date: Date, type: string, data: any[] }>> = new Map([[currentYear, []]]);
    for (let i = 0; i < activityData.length; i++) {
      if (isNotValidType(activityData[i])) {
        // console.log(activityData[i].type, "continue");
        continue;
      }
      const actDate = new Date(activityData[i].created_at);
      if (!result.has(actDate.getFullYear())) {
        currentYear = actDate.getFullYear();
        result.set(currentYear, []);
      }

      const resIndex = result.get(currentYear)?.findIndex(e => e.date.toLocaleDateString() === actDate.toLocaleDateString()
        && e.type === activityData[i].type
        && e.data[0].repo.name === activityData[i].repo.name);
      if (resIndex && resIndex !== -1) {
        result.get(currentYear)?.[resIndex].data.push(activityData[i])
      } else {
        result.get(currentYear)?.push({ date: actDate, type: activityData[i].type, data: [activityData[i]] })
      }
      //console.log(result, "push");
    }
    return result;
  }

  const fillActivityItems = (source: Map<number, Array<{ date: Date, type: string, data: any[] }>>) => {
    const result: JSX.Element[] = [];
    if(source.size === 1 && source.get(currentYear)?.length === 0) {
      result.push(<span className="warning">{"There are no activities for this user"}</span>);
      return result;
    }
    for (let year of source.keys()) {
      result.push(<span className="year">{year}</span>);
      const data = source.get(year)?.sort((a, b) => +b.date - +a.date).slice(0, 5);
      console.log(data, "ACT_DATA");
      data?.forEach(e => result.push(<ActivityItem groupData={e} />))
    }

    return result;
  }


  return (
    <div className="userRecentActivity">
      <div className="line"></div>
      <div className="content">
        {isLoadedData && fillActivityItems(activityDataProcessing())}
      </div>
    </div>
  );
}

function isNotValidType(data: any) {
  return !Object.values(ActivityType).includes(data.type)
  || (data.type === ActivityType.CreateEvent && data.payload.ref_type !== "repository")
  || (data.type === ActivityType.PullRequestEvent && data.payload.action !== "opened")
  || (data.type === ActivityType.IssuesEvent && !(data.payload.action === "opened" || data.payload.action === "reopened"))
}

export default UserRecentActivity;