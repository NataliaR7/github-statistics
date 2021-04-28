import './UserRecentActivity.css'
import UserActivityItem from './UserActivityItem'
import { UserActivityType, RepoActivityType } from '../../resources/constants'
import { useEffect, useState } from 'react';

interface PropsType {
    type: string;
    repoName?: string;
    username?: string;
}

interface ActivityDataType {
    date: Date;
    type: string;
    data: any[];
}

const RecentActivityPanel: React.FC<PropsType> = props => {
    const [isLoadedData, SetIsLoadedData] = useState(false);
    const [activityData, SetActivityData] = useState<any[]>([]);

    useEffect(() => {
        const queryUsername = props.username ? "?username=" + props.username : "";
        fetch(props.type === 'user' ? `/userRecentActivity${queryUsername}` : `/repoRecentActivity?repo=${props.repoName}`)
            .then(res => res.json())
            .then(result => {
                SetActivityData(activityData => activityData = result);
                SetIsLoadedData(true);
            })
    }, []);

    return (
        <div className="recentActivity">
            <div className="line"></div>
            <div className="content">
                {isLoadedData && printActivity(activityData, props.type)}
            </div>
        </div>
    );
}

let currentYear = new Date().getFullYear();

function printActivity(activityData: any[], type: string) {
    const warning = (<span className="warning">{`This ${type === "user" ? "user" : "repository"} has no activity in the past three months`}</span>);
    if (activityData.length === 0) {
        return warning;
    }
    const processedData = activityDataProcessing(activityData, type);
    const activityItems = fillActivityItems(processedData, type);
    return activityItems.length <= 1 ? warning : activityItems;
}

function activityDataProcessing(activityData: any[], type: string) {
    const result: Map<number, Array<ActivityDataType>> = new Map([[currentYear, []]]);
    const isNotValidType = type === "user" ? isNotValidUserType : isNotValidRepoType;
    for (let i = 0; i < activityData.length; i++) {
        if (isNotValidType(activityData[i])) {
            continue;
        }

        const actDate = new Date(activityData[i].created_at);
        if (!result.has(actDate.getFullYear())) {
            currentYear = actDate.getFullYear();
            result.set(currentYear, []);
        }

        const resIndex = result.get(currentYear)?.findIndex(e => isSimilar(e, activityData[i]));
        resIndex !== undefined && resIndex !== -1
            ? result.get(currentYear)?.[resIndex].data.push(activityData[i])
            : result.get(currentYear)?.push({ date: actDate, type: activityData[i].type, data: [activityData[i]] });
    }

    return result;
}

function fillActivityItems(source: Map<number, Array<ActivityDataType>>, type: string) {
    const result: JSX.Element[] = [];
    for (let year of source.keys()) {
        result.push(<span className="year">{year}</span>);
        const data = source.get(year)?.sort((a, b) => +b.date - +a.date);
        const topData = data?.slice(0, type === "user" ? 6 : 7);
        topData?.forEach(e => result.push(<UserActivityItem groupData={e} type={type} />))
    }

    return result;
}

function isNotValidUserType(data: any) {
    return !Object.values(UserActivityType).includes(data.type)
        || (data.type === UserActivityType.CreateEvent && data.payload.ref_type !== "repository")
        || (data.type === UserActivityType.PullRequestEvent && data.payload.action !== "opened")
        || (data.type === UserActivityType.IssuesEvent && !(data.payload.action === "opened" || data.payload.action === "reopened"));
}

function isNotValidRepoType(data: any) {
    return !Object.values(RepoActivityType).includes(data.type)
        || (data.type === RepoActivityType.PullRequestEvent && !(data.payload.action === "opened" || data.payload.action === "closed" || data.payload.action === "reopened"))
        || (data.type === RepoActivityType.IssuesEvent && !(data.payload.action === "opened" || data.payload.action === "closed" || data.payload.action === "reopened"));
}

function isSimilar(activity: any, data: any) {
    return activity.date.toLocaleDateString() === new Date(data.created_at).toLocaleDateString()
        && activity.type === data.type
        && activity.data[0].repo.name === data.repo.name
        && activity.data[0].actor.login === data.actor.login
        && activity.data[0].payload.action === data.payload.action;
}

export default RecentActivityPanel;