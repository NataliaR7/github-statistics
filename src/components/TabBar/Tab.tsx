import './Tab.css';

import {
    Redirect
} from "react-router-dom";

type TabType = { 
    title: string, 
    color: string, 
    path: string, 
    activePage: string, 
    onNavigate: (e: string) => void 
}

function Tab(props: TabType) {
    return (
        <div className="tab" onClick={() => props.onNavigate && props.onNavigate(props.path)}>
            {props.path === props.activePage && <Redirect to={props.activePage} />}
            {props.title}
            <div className="line" style={{ backgroundColor: props.color }}> </div>

        </div>
    );
}

export default Tab;