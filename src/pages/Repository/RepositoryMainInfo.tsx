import "./RepositoryMainInfo.css"
import React, { useEffect, useState } from 'react';

function RepositoryMainInfo() {
    return (
        <div className="repositoryMainInfo">
            {/* <div className="repoAdditionalPanel"> */}
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
            {/* </div> */}

            <div className="repoAbout">
                <span className="title">about</span>
                <span className="repositoryDescription">overpriced coffee task</span>
            </div>
        </div>
    );
}

export default RepositoryMainInfo;