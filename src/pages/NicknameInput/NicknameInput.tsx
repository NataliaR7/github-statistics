import "./NicknameInput.css";
import { Redirect } from "react-router-dom";
import React, { useState } from 'react';
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import NicknameForm from '../../components/NicknameForm/NicknameForm';
import Loader from '../../components/Loader/Loader';

interface PropsType {
  currentNickname: string;
  setNickname: (x: string) => void;
  resetStore: () => void;
}

const NicknameInput: React.FC<PropsType> = props => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const submitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.resetStore();

    const responseUser = await fetch('/nickname', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ nickname: props.currentNickname })
    });

    if (responseUser.status === 404) {
      setIsError(true);
    }
    setIsSubmit(true);
    loadData();
  }

  async function loadData() {
    await (await fetch('/user')).json();
    await (await fetch("/repos")).json();
    await (await fetch('/activity')).json()
    setIsLoadingData(true);
  }

  return (
    <div className="nicknameInput">
      {isError && <Redirect to="/notFound" />}
      {isLoadingData && <Redirect to="/main" />}
      {(!isLoadingData && isSubmit) && <Loader />}
      {!isSubmit &&
        <>
          <HeadLogo />
          <form action="" method="post" className="loginForm" onSubmit={(e) => submitHandler(e)}>
            <NicknameForm title="enter github nickname" setNickname={props.setNickname} />
          </form>
        </>
      }
    </div>
  );
}

export default NicknameInput;