import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "./NicknameInput.css"

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
    //{<Redirect to="/main" />}
    console.log("11");
  }

  if(isSubmit) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="nicknameInput">
      <form action="" method="post" className="loginForm" onSubmit={(e) => submitHandler(e)}>
        <span>введите никнейм пользователя github</span>
        <input className="inputForm" type="text" value={props.currentNickname} onChange={(e) => props.setNickname(e.target.value)} />
        <input className="submitButton" type="submit" value="Найти" />
      </form>
    </div>
  );
}

export default NicknameInput;