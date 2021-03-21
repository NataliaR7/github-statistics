import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import store from '../../store'
import Cookies from 'js-cookie';


export default function Login(props: { isLoggedIn: boolean, toLoggedIn: (x: boolean) => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const clientId = "a53c785b082e97521c98";
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
        <div className="container">
            <h1>Welcome</h1>
            <span>Super amazing app</span>
            {/* {store.getState().isLoggedIn && console.log("FFFFFFF")}
            {console.log(store.getState().isLoggedIn, "FFFFFFF1")} */}
            {!isLoading && <div className="login-container">
                <a
                    className="login-link"
                    href={`https://github.com/login/oauth/authorize?scope=user%20repo%20read:org&client_id=${clientId}&redirect_uri=${redirectUri}`}
                >
                    <span>Login with GitHub</span>
                </a>
            </div>}
        </div>
    );
}