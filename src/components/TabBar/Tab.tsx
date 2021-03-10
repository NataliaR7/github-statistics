import './Tab.css';

import {
    Redirect
} from "react-router-dom";
import { useState } from 'react';
function Tab(props: { title: string, color: string, path: string }) {
    const [active, setActive] = useState(false);
    const makeTabActive = () => {
        setActive(active => active = true);
        console.log(props.path);
    }
    return (
        <div className="tab" onClick={makeTabActive}>
            {active && <Redirect to={props.path} />}
            {props.title}
            <div className="line" style={{ backgroundColor: props.color }}> </div>

        </div>

    );
}

export default Tab;