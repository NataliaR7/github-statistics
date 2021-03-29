import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "./NicknameInput.css"
import HeadLogo from '../../components/HeadLogo/HeadLogo';

function NicknameInput(props: { currentNickname: string, setNickname: (x: string) => void }) {
  const [isSubmit, setIsSubmit] = useState(false);

  const submitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e, "INP");
    console.log(e.target, "INP");
    const responseUser = await fetch('/nickname', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ nickname: props.currentNickname })
    });


    //const data = await responseUser.json();
    setIsSubmit(true);
  }

  if(isSubmit) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="nicknameInput">
      <HeadLogo />
      <form action="" method="post" className="loginForm" onSubmit={(e) => submitHandler(e)}>
        {/* <span>введите никнейм пользователя github</span> */}
        <span>enter your github nickname</span>
        <input className="inputForm" type="text" value={props.currentNickname} onChange={(e) => props.setNickname(e.target.value)} />
        <input className="submitButton" type="submit" value="ok" />
      </form>
    </div>
  );
}

export default NicknameInput;