import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import store from '../../store'
import Cookies from 'js-cookie';
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import getGitHubLogo from "../../svg/githubSvg"
import './Login.css'


export default function Login(props: { isLoggedIn: boolean, toLoggedIn: (x: boolean) => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const clientId = "9607ea01165c834b3511";
    const redirectUri = "http://localhost:3000/login";

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const newUrl = url.split("?code=");
            console.log(newUrl[1]);
            let response = fetch('/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ code: newUrl[1] })
            });
            response.then(res => {
                if (res.ok && !props.isLoggedIn) {
                    console.log("login post");
                    console.log(res);
                    //props.toLoggedIn(true); //dispatch
                    //Cookies.set('isLoggedIn', 'true');
                    setIsLoading(true);
                }
            });
        }
    }, [isLoading]);

    if (/* props.isLoggedIn */!!Cookies.get('isLoggedIn')) {
        console.log(!!Cookies.get('isLoggedIn'), "SATATE");
        return <Redirect to="/nickname" />;
    }

    return (
        <div className="login">
            <HeadLogo />
            <div className="welcomeForm" >
                <span className="titleForm">Welcome</span>
                <span>Login with github please</span>
                <a className="authButton" href={`https://github.com/login/oauth/authorize?scope=user%20repo%20read:org&client_id=${clientId}&redirect_uri=${redirectUri}`}>
                    {getGitHubLogo()}
                    <span>login with github</span>
                </a>
            </div>
        </div>
    );
}