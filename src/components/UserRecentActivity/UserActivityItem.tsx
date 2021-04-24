import './ActivityItem.css'
import { UserActivityType, RepoActivityType, Mouth } from '../../resources/constants'
import { useEffect, useState } from 'react';

type ContentType = {
    text: string;
    target: string;
    targetType: string;
    date: Date;
}

function getStylizedDate(date: Date) {
    return `${Mouth[date.getMonth()]} ${date.getDate()}`
}

function UserActivityItem(props: { groupData: { date: Date, type: string, data: any[] }, type: string }) {
    const [actContent, setActContent] = useState<ContentType>({ text: "", target: "", targetType: "", date: new Date(2011, 0, 1) });
    const [isFill, setIsFill] = useState(false);

    useEffect(() => {
        console.log("ACT_ITEM")
        setContentForType();
        setIsFill(true);
    }, []);

    const groupData = props.groupData;
    const data = groupData.data;

    const setContentForType = () => {
        switch (groupData.type) {
            case UserActivityType.PushEvent: {
                setPushEventContent();
                break;
            }
            case UserActivityType.PullRequestEvent: {
                setPullRequestEventContent();
                break;
            }
            case UserActivityType.CreateEvent: {
                let text = "Created";
                let target = data[0].repo.name;
                if (data.length !== 1) {
                    text = `Created ${data.length}`
                    target = '';
                }
                setActContent(content => content = {
                    text: text,
                    target: target,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case UserActivityType.ForkEvent: {
                setActContent(content => content = {
                    text: "Forked",
                    target: data[0].repo.name,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case UserActivityType.IssuesEvent: {
                setIssuesEventContent();
                break;
            }
            case UserActivityType.WatchEvent: {
                let text = "Starred";
                let target = data[0].repo.name;
                if (data.length !== 1) {
                    text = `Starred ${data.length}`
                    target = '';
                }
                setActContent(content => content = {
                    text: text,
                    target: target,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case RepoActivityType.PullRequestReviewEvent: {
                setPullRequestReviewEventContent();
                break;
            }
        }
    }

    const setPushEventContent = () => {
        let text = "";
        let target = "";
        let targetType = "";

        if (props.type === "user") {
            text = (data.length !== 1) ? `Created ${data.length} commits in` : "Created a commit in";
            target = data[0].repo.name;
            targetType = "repository";
        } else {
            text = (data[0].payload.size > 1) ? `${data[0].payload.size} commits pushed by`:"Commit pushed by"
            target = `${data[0].actor.login}`
        }
        setActContent(content => content = {
            text: text,
            target: target,
            targetType: targetType,
            date: groupData.date
        });
    }
    const setPullRequestEventContent = () => {
        let text = "";
        let target = "";
        let targetType = "";

        if (props.type === "user") {
            text = "Opened a pull request in";
            target = data[0].repo.name;
            targetType = "repository";
        } else {
            text = `Pull request #${data[0].payload.number} ${data[0].payload.action} by`;
            target = `${data[0].actor.login}`
        }
        setActContent(content => content = {
            text: text,
            target: target,
            targetType: targetType,
            date: groupData.date
        });
    }

    const setIssuesEventContent = () => {
        let text = "";
        let target = "";
        let targetType = "";

        if (props.type === "user") {
            text = data.length !== 1 ? `Opened ${data.length} issues in` : "Opened a issue in";
            target = data[0].repo.name;
            targetType = "repository";
        } else {
            text = `Issues #${data[0].payload.issue.number} ${data[0].payload.action} by`;
            target = `${data[0].actor.login}`
        }
        setActContent(content => content = {
            text: text,
            target: target,
            targetType: targetType,
            date: groupData.date
        });
    }

    const setPullRequestReviewEventContent = () => {
        let text = "";
        let target = "";
        let targetType = "";

        if (props.type === "user") {
            text = data.length !== 1 ? `Reviewed ${data.length} pull requests in` : "Reviewed pull request in";
            target = data[0].repo.name;
            targetType = "repository";
        } else {
            text = `Pull requests #${data[0].payload.pull_request.number} reviewed by`;
            target = `${data[0].actor.login}`
        }
        setActContent(content => content = {
            text: text,
            target: target,
            targetType: targetType,
            date: groupData.date
        });
    }

    return (
        <div className="activityItem">
            {isFill && <>
                <div className="circle"></div>
                <div className="activityInfo">
                    {actContent.text} <span className="repo">{actContent.target}</span> {actContent.targetType}
                </div>
                <div className="date">{getStylizedDate(actContent.date)}</div>
            </>}
        </div>
    );
}

export default UserActivityItem;