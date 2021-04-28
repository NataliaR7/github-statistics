import './ComparePanel.css';
import ActivityChart from '../../components/UserActivity/ActivityChart';
import LanguagesChart from '../../components/UserLanguages/LanguagesChart';
import RecentActivityPanel from '../../components/RecentActivity/RecentActivityPanel';
import PartnerPanel from '../../components/Partners/PartnerPanel';
import RepoPanel from '../../components/RepoPanel/RepoPanel';
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import { useEffect, useState } from 'react';

interface PropsType {
    compareName: string;
    minState: number;
    maxState: number;
}

const ComparePanel: React.FC<PropsType> = props => {
    const [currentState, setCurrentState] = useState<number>(props.minState);

    return (
        <div className="comparePanel">
            <div className="header">
                <span className="navArrow" onClick={() => { setCurrentState(currentState === props.minState ? props.maxState : currentState - 1) }}>⮜</span>
                <span>{statePanel[currentState]}</span>
                <span className="navArrow" onClick={() => { setCurrentState(currentState === props.maxState ? props.minState : currentState + 1) }}>⮞</span>
            </div>
            <div className="leftUserData">
                {getCompareContent("left", currentState)}
            </div>
            <div className="rightUserData">
                {getCompareContent("right", currentState, props.compareName)}
            </div>
        </div>
    );
}

const statePanel: { [index: number]: string } = {
    0: "activity",
    1: "languages",
    2: "recent activity",
    3: "work partners",
    4: "repositories",
}

function getCompareContent(location: string, currentState: number, compareName?: string) {
    switch (currentState) {
        case 0: {
            return location === "left"
                ? <ActivityChart />
                : <ActivityChart username={compareName} />;
        }
        case 1: {
            return location === "left" 
                ? <UserLanguages width="530" height="300" />
                : <UserLanguages username={compareName} width="530" height="300" />
        }
        case 2: {
            return location === "left"
                ? <RecentActivityPanel type="user" />
                : <RecentActivityPanel type="user" username={compareName} />
        }
        case 3: {
            return location === "left"
                ? <PartnerPanel />
                : <PartnerPanel username={compareName} />
        }
        case 4: {
            return location === "left"
                ? <RepoPanel type="square" />
                : <RepoPanel type="square" username={compareName} />
        }
    }
}

export default ComparePanel;