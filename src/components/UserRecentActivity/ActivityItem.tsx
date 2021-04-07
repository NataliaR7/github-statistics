import './ActivityItem.css'
import { ActivityType, Mouth } from '../../resources/constants'
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

function ActivityItem(props: { groupData: { date: Date, type: string, data: any[] } }) {
    const [actContent, setActContent] = useState<ContentType>({text: "", target: "", targetType: "", date: new Date(2011, 0, 1)});
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
            case ActivityType.PushEvent: {
                let text = "Created a commit in";
                if(data.length !== 1) {
                    text = `Created ${data.length} commit in`
                }
                setActContent(content => content = {
                    text: text,
                    target: data[0].repo.name,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case ActivityType.PullRequestEvent: {
                let text = "";
                if(data[0].payload.action === "opened") {
                    text = "Opened a pull request in"
                }
                // if(data[0].payload.action === "closed") {
                //     text = "Closed a pull request in"
                // }
                setActContent(content => content = {
                    text: text,
                    target: data[0].repo.name,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case ActivityType.CreateEvent: {
                let text = "Created";
                let target = data[0].repo.name;
                if(data.length !== 1) {
                    text = `Created ${data.length}`
                    target = '';
                }
                setActContent(content => content = {
                    text: "Created",
                    target: target,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case ActivityType.ForkEvent: {
                setActContent(content => content = {
                    text: "Forked",
                    target: data[0].repo.name,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case ActivityType.IssuesEvent: {
                let text = "";
                if(data[0].payload.action === "opened" || data[0].payload.action === "reopened") {
                    text = "Opened a issue in"
                }
                if(data.length !== 1) {
                    text = `Opened ${data.length} issue in`
                }
                setActContent(content => content = {
                    text: text,
                    target: data[0].repo.name,
                    targetType: "repository",
                    date: groupData.date
                });
                break;
            }
            case ActivityType.WatchEvent: {
                let text = "Starred";
                let target = data[0].repo.name;
                if(data.length !== 1) {
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
        }
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

export default ActivityItem;