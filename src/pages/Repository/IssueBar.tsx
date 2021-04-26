import "./IssueBar.css"
import getClosedIssuesIcon from '../../resources/closedIssuesSvg'
import getOpenIssuesIcon from '../../resources/openIssuesSvg'
import getMergedPRIcon from '../../resources/mergedPRSvg'
import getOpenPRIcon from '../../resources/openPRSvg'

interface PropsType {
    isPullRequest?: boolean;
}

function IssueBar(props: PropsType) {

    return (
        <div className="issueBar">
            <span>{props.isPullRequest ? 'Pull requests' : 'Issues'}</span>
            <div className="statisticLine">
                <div className="closedLine" style={{width: "40%", backgroundColor: `${props.isPullRequest ? '#7144C5' : '#D83A48'}`}}></div>
                <div className="openLine" style={{width: "60%"}}></div>
            </div>
            <div className="statisticData">
                <div>
                    {props.isPullRequest ? getMergedPRIcon() : getClosedIssuesIcon()}
                    <span>82 {props.isPullRequest ? 'Merged' : 'Closed'}</span>
                </div>
                <div>
                    {props.isPullRequest ? getOpenPRIcon() : getOpenIssuesIcon()}
                    <span>8 Open</span>
                </div>
            </div>
        </div>
    );
}

export default IssueBar;