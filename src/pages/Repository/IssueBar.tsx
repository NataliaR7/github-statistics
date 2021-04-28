import "./IssueBar.css";
import getClosedIssuesIcon from '../../resources/closedIssuesSvg';
import getOpenIssuesIcon from '../../resources/openIssuesSvg';
import getMergedPRIcon from '../../resources/mergedPRSvg';
import getOpenPRIcon from '../../resources/openPRSvg';

interface PropsType {
    openCount: number;
    closedCount: number;
    isPullRequest?: boolean;
}

const IssueBar: React.FC<PropsType> = props => {
    const generalCount = props.openCount + props.closedCount;
    return (
        <div className="issueBar">
            <span className="labelIssue">{props.isPullRequest ? 'Pull requests' : 'Issues'}</span>
            <div className="statisticLine">
                <div className="closedLine" style={{ width: `${props.closedCount / generalCount * 100}%`, backgroundColor: `${props.isPullRequest ? '#7144C5' : '#D83A48'}` }}></div>
                <div className="openLine" style={{ width: `${props.openCount / generalCount * 100}%` }}></div>
            </div>
            <div className="statisticData">
                <div>
                    {props.isPullRequest ? getMergedPRIcon() : getClosedIssuesIcon()}
                    <span>{props.closedCount} {props.isPullRequest ? 'Merged' : 'Closed'}</span>
                </div>
                <div>
                    {props.isPullRequest ? getOpenPRIcon() : getOpenIssuesIcon()}
                    <span>{props.openCount} Open</span>
                </div>
            </div>
        </div>
    );
}

export default IssueBar;