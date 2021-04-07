import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "./NicknameInput.css"
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import NicknameForm from '../../components/NicknameForm/NicknameForm';
import HashLoader from "react-spinners/HashLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import { getRandomGeneralColor } from "../../resources/colors"

function NicknameInput(props: { currentNickname: string, setNickname: (x: string) => void }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  //const [color, setColor] = useState(getRandomColor());

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
    })/* .then(res => console.log(res, "ERR")); */
    console.log(responseUser.status)
    if (responseUser.status === 404) {
      setIsError(true);
    }
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
    // const activity = await fetch("/activity");
    // let a1 = await activity.json();
    // console.log(a1, "ACTIVITY");
    console.log("end");
    setIsLoadingData(true);
  }

  // useEffect(() => {
  //   //setInterval(() => setColor(getRandomColor()), 2000);
  //   let timerId = setTimeout(function tick() {
  //     setColor(getRandomColor());
  //     timerId = setTimeout(tick, 2100); 
  //   }, 2100);
  // }, [color]);
  // if(isSubmit) {
  //   loadData();
  //   return <Redirect to="/main" />;
  // }

  return (
    <div className="nicknameInput">
      {isError && <Redirect to="/notFound" />}
      { (!isLoadingData && isSubmit)  ? <div className="hashLoader">
        <HashLoader size={150} color={getRandomGeneralColor()} />
        <span>Collecting information...</span>
      </div>:
      !isSubmit
        ? <>
          <HeadLogo />
          <form action="" method="post" className="loginForm" onSubmit={(e) => submitHandler(e)}>
            {/* <span>enter your github nickname</span>
            <input className="inputForm" type="text" value={props.currentNickname} onChange={(e) => props.setNickname(e.target.value)} />
            <input className="submitButton" type="submit" value="ok" /> */}
            <NicknameForm title="enter your github nickname" setNickname={props.setNickname} />
          </form>
        </>
        : isLoadingData && <Redirect to="/main" />
      }
    </div>
  );
}

export default NicknameInput;