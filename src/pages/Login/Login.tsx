import './Login.css';
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import getGitHubLogo from "../../resources/githubSvg";

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getToken().then((res: any) => {
            if (!res) return;
            if (res.ok) {
                setIsLoading(true);
            }
        });
    }, [isLoading]);

    return (
        <main className="login">
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
        </main>
    );
}

const clientId = "9607ea01165c834b3511";
const redirectUri = "http://localhost:3000/login";

async function getToken() {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
        const userToken = url.split("?code=");
        return await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ code: userToken[1] })
        })
    }
}

export default Login;