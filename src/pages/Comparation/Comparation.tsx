import './Comparation.css';
import UserLanguages from "../../components/UserLanguages/UserLanguages"
import UserPanel from "../../containers/UserPanel"
import NicknameForm from "../../components/NicknameForm/NicknameForm"
import UserRepositories from "../../components/UserRepositories/UserRepositories"
import { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import ComparePanel from './ComparePanel'
import Loader from '../../components/Loader/Loader'

interface PropsType {
    compareNickname: string;
    setCompareNickname: (value: string) => void;
}

function Comparation(props: PropsType) {
    const [compareUserName, setCompareUserName] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoadedData, setIsLoadedData] = useState(false);

    async function loadData() {
        // console.log("start");
        const queryUsername = props.compareNickname ? "?username=" + props.compareNickname : "";
        const userResult = await (await fetch(`/user${queryUsername}`)).json()
        const repositories = await (await fetch(`/repos${queryUsername}`)).json();
        const activ = await (await fetch(`/activity${queryUsername}`)).json();
        const lang = await (await fetch(`/userlangs${queryUsername}`)).json();
     
        await setIsLoadedData(true);
      }


    useEffect(() => {
        props.compareNickname && loadData();
    }, [props.compareNickname])

    const submitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const responseUser = await fetch('/compareNickname', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ nickname: compareUserName.toLowerCase() })
        })/* .then(res => console.log(res, "ERR")); */
        console.log(responseUser.status)
        if (responseUser.status === 404) {
          setIsError(true);
        } else {
            props.setCompareNickname(compareUserName.toLowerCase())
        }
        
        await setIsSubmit(true);
    
      }

    return (
        <div className="comparation">
            {isError ? <ErrorNotFound backPage={setIsError} />
            : props.compareNickname.length === 0  ?
                <div className="comparationForm">
                    <form action="" method="post" className="loginForm" onSubmit={(e) => {submitHandler(e)}}>

                        <NicknameForm title="enter github nickname" setNickname={setCompareUserName} />
                        {/* {setCompareUserName(compareUserName => compareUserName = "NataliaR7")} */}

                    </form>
                </div>
                : isLoadedData ? <div className="comparationContent">
                    <UserPanel username={props.compareNickname} />
                    <div className="dataCompare">
                        {/* <div className="upPanel"> 

                        </div>
                        <div className="downPanel"> 

                        </div> */}
                        <ComparePanel compareName={props.compareNickname} minState={0} maxState={1} />
                        <ComparePanel compareName={props.compareNickname} minState={2} maxState={4} />
                    </div>
                </div>
                :  <Loader />
            }

        </div>
    );
}

export default Comparation;