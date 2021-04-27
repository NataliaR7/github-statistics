import './Login.css';
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import getGitHubLogo from "../../resources/githubSvg";

interface PropsType {
    isLoggedIn: boolean;
}

export default function Login(props: PropsType) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const userToken = url.split("?code=");
            fetch('/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ code: userToken[1] })
            })
                .then(res => {
                    if (res.ok && !props.isLoggedIn) {
                        setIsLoading(true);
                    }
                });
        }
    }, [isLoading]);

    const clientId = "9607ea01165c834b3511";
    const redirectUri = "http://localhost:3000/login";

    return (
        <div className="login">
            {isLoading && <Redirect to="/nickname" />}
            <HeadLogo />
            <div className="welcomeForm" >
                <span className="titleForm">Welcome</span>
                <span>Login with github please</span>
                <a className="authButton" href={`https://github.com/login/oauth/authorize?scope=read:user%20public_repo%20read:org&client_id=${clientId}&redirect_uri=${redirectUri}`}>
                    {getGitHubLogo()}
                    <span>login with github</span>
                </a>
            </div>
        </div>
    );
}