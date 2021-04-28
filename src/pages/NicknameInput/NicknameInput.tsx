import "./NicknameInput.css";
import { Redirect } from "react-router-dom";
import React, { useState } from 'react';
import HeadLogo from '../../components/HeadLogo/HeadLogo';
import NicknameForm from '../../components/NicknameForm/NicknameForm';
import Loader from '../../components/Loader/Loader';

interface PropsType {
  resetStore: () => void;
}

const NicknameInput: React.FC<PropsType> = props => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  return (
    <div className="nicknameInput">
      {isError && <Redirect to="/notFound" />}
      {isLoadingData && <Redirect to="/main" />}
      {(!isLoadingData && isSubmit) && <Loader />}
      {!isSubmit &&
        <>
          <HeadLogo />
          <form action="" method="post" className="loginForm" onSubmit={(e) => {
            e.preventDefault();
            props.resetStore();
            checkUserExist(currentUserName)
              .then((response) => {
                if (response.status === 404) {
                  setIsError(true);
                  return;
                }
                setIsSubmit(true);
                loadData()
                  .then(() => setIsLoadingData(true));
              });
          }}>
            <NicknameForm title="enter github nickname" setNickname={setCurrentUserName} />
          </form>
        </>
      }
    </div>
  );
}

async function checkUserExist(currentNickname: string) {
  return await fetch('/nickname', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ nickname: currentNickname })
  });
}

async function loadData() {
  await (await fetch('/user')).json();
  await (await fetch("/repos")).json();
  await (await fetch('/activity')).json();
}

export default NicknameInput;