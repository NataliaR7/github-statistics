import './ComparePanel.css';
import ActivityChart from '../../components/UserActivity/ActivityChart'
import LanguagesChart from '../../components/UserLanguages/LanguagesChart'
import RecentActivityPanel from '../../components/UserRecentActivity/RecentActivityPanel'
import PartnerPanel from '../../components/Partners/PartnerPanel'
import RepoPanel from '../../components/UserRepositories/RepoPanel'
import { useEffect, useState } from 'react';

interface PropsType {
    compareName: string;
    minState: number;
    maxState: number;
}

const statePanel: { [index: number]: string } = {
    0: "activity",
    1: "languages",
    2: "recent activity",
    3: "work partners",
    4: "repositories",
}

function ComparePanel(props: PropsType) {
    const [currentState, setCurrentState] = useState<number>(props.minState);

    const getChart = (location: string) => {
        switch (currentState) {
            case 0: {
                return location === "left" 
                ? <ActivityChart />
                : <ActivityChart username={props.compareName} />;
            }
            case 1: {
                return location === "left" 
                ? <LanguagesChart width="530" height="350" /* legendPosition="left" */ />
                : <LanguagesChart width="530" height="350" username={props.compareName} />
            }
            case 2: {
                return location === "left" 
                ? <RecentActivityPanel type="user"/>
                : <RecentActivityPanel type="user" username={props.compareName}/>
            }
            case 3: {
                return location === "left" 
                ? <PartnerPanel />
                : <PartnerPanel username={props.compareName} />
            }
            case 4: {
                return location === "left" 
                ? <RepoPanel type="square" />
                : <RepoPanel type="square" username={props.compareName} />
            }
        }
    }

    return (
        <div className="comparePanel">
            <div className="header">
                <span className="navArrow" onClick={() => { setCurrentState(currentState === props.minState ? props.maxState : currentState - 1) }}>⮜</span>
                <span>{statePanel[currentState]}</span>
                <span className="navArrow" onClick={() => { setCurrentState(currentState === props.maxState ? props.minState : currentState + 1) }}>⮞</span>
            </div>
            {/* <ActivityChart /> */}
            <div className="leftUserData">
                {/* <ActivityChart /> */}
                { getChart("left") }
                {/* <LanguagesChart width="500" height="350" legendPosition="left" /> */}
            </div>
            <div className="rightUserData">
                {/* <ActivityChart username={props.compareName} /> */}
                { getChart("right") }
                {/* <LanguagesChart width="500" height="350" username={props.compareName} /> */}
            </div>
        </div>
    );
}

export default ComparePanel;