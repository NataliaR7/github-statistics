import './Tab.css';
import React, { useEffect, useRef } from "react";
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
    const currentTab = useRef<HTMLDivElement>(null);
    useEffect(()=> {
        setActiveStatus();
    }, [props.activePage]);
    const setActiveStatus = () => {
        if(props.path === props.activePage && currentTab && currentTab.current) {
            currentTab.current.classList.add("active");
        } 
        if(props.path !== props.activePage && currentTab && currentTab.current) {
            currentTab.current.classList.remove("active");
        } 
    }
    return (
        <div className="tab" ref={currentTab} onClick={(e) => {
            props.onNavigate && props.onNavigate(props.path);
            e.currentTarget.classList.add("active");
            console.log(e);
        }}>
            {props.path === props.activePage && <Redirect to={props.activePage} />}
            
            {props.title}
            <div className="line" style={{ backgroundColor: props.color }}> </div>

        </div>
    );
}

export default Tab;