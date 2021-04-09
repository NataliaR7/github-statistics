import "./Repository.css"
import stope from '../../store'
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import RepositoryMainInfo from './RepositoryMainInfo'

function Repository() {
    const [isBack, setIsBack] = useState(false);
    return (
        <div className="repository">
            { isBack && <Redirect to="/repos" />}
            <div className="repositoryHead">
                <span className="repositoryName"><span onClick={() => {
                    stope.getState().isRepoActive = false;
                    setIsBack(true);
                }}>{"⮜"}</span>{"overpriced-coffee"}</span>
                <span className="repositoryFork">Forked from kontur-courses/react-ts</span>
            </div>
            <RepositoryMainInfo />
            <div className="statistics">
                <div className="languageRepo">
                    
                </div>
                <div className="issueAvgRepo">

                </div>
                <div className="activityRepo">

                </div>
                <div className="issueCountRepo">

                </div>

            </div>

        </div>
    );
}

export default Repository;