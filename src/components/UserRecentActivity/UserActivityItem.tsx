import './ActivityItem.css'
import { UserActivityType, RepoActivityType, Mouth } from '../../resources/constants'
import { useEffect, useState } from 'react';

interface PropsType {
    groupData: GroupDataType;
    type: string;
}

interface GroupDataType {
    date: Date;
    type: string;
    data: any[];
}

interface ActivityContentType {
    text: string;
    target: string;
    targetType: string;
    date: Date;
}

const UserActivityItem: React.FC<PropsType> = props => {
    const [actContent, setActContent] = useState<ActivityContentType>(activityContentDefault);
    const [isFill, setIsFill] = useState(false);

    useEffect(() => {
        setActContent(content => content = getContentForType(props));
        setIsFill(true);
    }, []);

    return (
        <div className="activityItem">
            {isFill && <>
                <div className="circle"></div>
                <div className="activityInfo">
                    {actContent.text} <span className="repo canSelect">{actContent.target}</span> {actContent.targetType}
                </div>
                <div className="date">{getStylizedDate(actContent.date)}</div>
            </>}
        </div>
    );
}

const activityContentDefault = { text: "", target: "", targetType: "", date: new Date(2011, 0, 1) };

function getContentForType (props: PropsType) {
    const groupData = props.groupData;
    const data = groupData.data;
    switch (groupData.type) {
        case UserActivityType.PushEvent: {
            return getPushEventContent(groupData, props.type);
        }
        case UserActivityType.PullRequestEvent: {
            return getPullRequestEventContent(groupData, props.type);
        }
        case UserActivityType.CreateEvent: {
            let text = "Created";
            let target = data[0].repo.name;
            if (data.length !== 1) {
                text = `Created ${data.length}`
                target = '';
            }
            return {
                text: text,
                target: target,
                targetType: "repository",
                date: groupData.date
            };
        }
        case UserActivityType.ForkEvent: {
            return {
                text: "Forked",
                target: data[0].repo.name,
                targetType: "repository",
                date: groupData.date
            };
        }
        case UserActivityType.IssuesEvent: {
            return getIssuesEventContent(groupData, props.type);
        }
        case UserActivityType.WatchEvent: {
            let text = "Starred";
            let target = data[0].repo.name;
            if (data.length !== 1) {
                text = `Starred ${data.length}`
                target = '';
            }
            return {
                text: text,
                target: target,
                targetType: "repository",
                date: groupData.date
            };
        }
        case RepoActivityType.PullRequestReviewEvent: {
            return getPullRequestReviewEventContent(groupData, props.type);
        }
        default: {
            return activityContentDefault;
        }
    }
}

function getPushEventContent (groupData: GroupDataType, type: string) {
    const data = groupData.data;
    let text = "";
    let target = "";
    let targetType = "";

    if (type === "user") {
        text = (data.length !== 1) ? `Created ${data.length} commits in` : "Created a commit in";
        target = data[0].repo.name;
        targetType = "repository";
    } else {
        text = (data[0].payload.size > 1) ? `${data[0].payload.size} commits pushed by` : "Commit pushed by"
        target = `${data[0].actor.login}`
    }

    return {
        text: text,
        target: target,
        targetType: targetType,
        date: groupData.date
    };
}

function getPullRequestEventContent (groupData: GroupDataType, type: string) {
    const data = groupData.data;
    let text = "";
    let target = "";
    let targetType = "";

    if (type === "user") {
        text = "Opened a pull request in";
        target = data[0].repo.name;
        targetType = "repository";
    } else {
        text = `Pull request #${data[0].payload.number} ${data[0].payload.action} by`;
        target = `${data[0].actor.login}`
    }
    return {
        text: text,
        target: target,
        targetType: targetType,
        date: groupData.date
    };
}

function getIssuesEventContent (groupData: GroupDataType, type: string) {
    const data = groupData.data;
    let text = "";
    let target = "";
    let targetType = "";

    if (type === "user") {
        text = data.length !== 1 ? `Opened ${data.length} issues in` : "Opened a issue in";
        target = data[0].repo.name;
        targetType = "repository";
    } else {
        text = `Issues #${data[0].payload.issue.number} ${data[0].payload.action} by`;
        target = `${data[0].actor.login}`
    }
    return {
        text: text,
        target: target,
        targetType: targetType,
        date: groupData.date
    };
}

function getPullRequestReviewEventContent (groupData: GroupDataType, type: string) {
    const data = groupData.data;
    let text = "";
    let target = "";
    let targetType = "";

    if (type === "user") {
        text = data.length !== 1 ? `Reviewed ${data.length} pull requests in` : "Reviewed pull request in";
        target = data[0].repo.name;
        targetType = "repository";
    } else {
        text = `Pull requests #${data[0].payload.pull_request.number} reviewed by`;
        target = `${data[0].actor.login}`
    }
    return {
        text: text,
        target: target,
        targetType: targetType,
        date: groupData.date
    };
}

function getStylizedDate(date: Date) {
    return `${Mouth[date.getMonth()]} ${date.getDate()}`
}

export default UserActivityItem;