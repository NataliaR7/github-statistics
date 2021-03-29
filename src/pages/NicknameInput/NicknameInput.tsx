import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "./NicknameInput.css"
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import HashLoader from "react-spinners/HashLoader";

function NicknameInput(props: { currentNickname: string, setNickname: (x: string) => void }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

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

    await setIsSubmit(true);
    loadData();
    
  }

  async function loadData() {
    console.log("start");
    const responseUser = await fetch('/user');
    const data = await responseUser.json();
    const repositories = await (await fetch("/repos")).json();
    const lang = await fetch("/lang");
    let a = await lang.json();
    console.log(a, "LGLoad");
    console.log("end");
    setIsLoadingData(true);
  }

  // if(isSubmit) {
  //   loadData();
  //   return <Redirect to="/main" />;
  // }

  return (
    <div className="nicknameInput">
      <HashLoader loading={!isLoadingData && isSubmit} />
      {!isSubmit 
      ? <>
          <HeadLogo />
          <form action="" method="post" className="loginForm" onSubmit={(e) => submitHandler(e)}>
            <span>enter your github nickname</span>
            <input className="inputForm" type="text" value={props.currentNickname} onChange={(e) => props.setNickname(e.target.value)} />
            <input className="submitButton" type="submit" value="ok" />
          </form>
        </>
        : isLoadingData && <Redirect to="/main" />
      }
    </div>
  );
}

export default NicknameInput;