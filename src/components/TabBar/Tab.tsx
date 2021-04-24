import './Tab.css';
import { useEffect, useRef } from "react";

type TabType = {
    title: string,
    color: string,
    path: string,
    isActive: boolean,
    activePage: string,
    onNavigate: (e: string) => void
}

function Tab(props: TabType) {
    const currentTab = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.isActive
            ? currentTab?.current?.classList.add("active")
            : currentTab?.current?.classList.remove("active")
    })
    return (
        <div className="tab" ref={currentTab} onClick={(e) => {
            props.onNavigate && props.onNavigate(props.path);
            e.currentTarget.classList.add("active");

        }}>
            {props.title}
            <div className="line" style={{ backgroundColor: props.color }}> </div>

        </div>
    );
}

export default Tab;