import "./Repository.css"
import stope from '../../store'
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';

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
            <div className="repoInfo">

                <div className="repoAdditionalPanel">
                    <div className="repoInfoComponent">
                        <div className="ownerPanel">
                            <span className="header">owner</span>
                            <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="ownerAvatar" />
                            <span>Aminopyridin</span>
                        </div>
                        <div className="separator"></div>
                        <div className="infoPanel">
                            <span className="header">info</span>
                            <span>Forks <span>{61}</span></span>
                            <span>Stars <span>{30}</span></span>
                            <span>Watchers <span>{34}</span></span>
                            <span>Open issues <span>{4}</span></span>
                        </div>
                        <div className="separator"></div>
                        <div className="contributorsPanel">
                            <span className="header">main contributors</span>
                            <div className="contributors">
                                <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" />
                                <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" />
                                <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="repoAbout">
                    <span className="title">about</span>
                    <span className="repositoryDescription">overpriced coffee task</span>
                </div>
            </div>
        </div>
    );
}

export default Repository;