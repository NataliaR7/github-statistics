import './Comparation.css';
import UserPanel from "../../containers/UserPanel";
import NicknameForm from "../../components/NicknameForm/NicknameForm";
import { useEffect, useState } from 'react';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import ComparePanel from './ComparePanel';
import Loader from '../../components/Loader/Loader';

interface PropsType {
    compareNickname: string;
    setCompareNickname: (value: string) => void;
}

const Comparation: React.FC<PropsType> = props => {
    const [compareUserName, setCompareUserName] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        props.compareNickname && loadData(props.compareNickname).then(() => {
            setIsLoadedData(true);
        });
    }, [props.compareNickname]);

    const showNicknameForm = () => {
        return (<div className="comparationForm">
            <form action="" method="post" className="loginForm" onSubmit={(e) => {
                e.preventDefault();
                setIsLoadedData(false);
                checkUserExist(compareUserName)
                    .then((response) => {
                        if (response.status === 404) {
                            setIsError(true);
                            return;
                        }
                        props.setCompareNickname(compareUserName.toLowerCase());
                    });
            }}>
                <NicknameForm title="enter github nickname" setNickname={setCompareUserName} />
            </form>
        </div>)
    }
    const showComparePage = () => {
        return (<div className="comparationContent">
            <UserPanel username={props.compareNickname} />
            <div className="dataCompare">
                <ComparePanel compareName={props.compareNickname} minState={0} maxState={1} />
                <ComparePanel compareName={props.compareNickname} minState={2} maxState={4} />
            </div>
        </div>)
    }

    return (
        <div className="comparation">
            {isError && <ErrorNotFound backPage={setIsError} />}
            {!isError && props.compareNickname.length === 0
                ? showNicknameForm()
                : <>
                    {!isLoadedData && <Loader />}
                    {isLoadedData && showComparePage()}
                </>}
        </div>
    );
}

async function loadData(compareNickname?: string) {
    const queryUsername = compareNickname ? "?username=" + compareNickname : "";
    await fetch(`/user${queryUsername}`);
    await fetch(`/repos${queryUsername}`);
    await fetch(`/activity${queryUsername}`);
    await fetch(`/userlangs${queryUsername}`);
}

async function checkUserExist(compareUserName: string) {
    return await fetch('/compareNickname', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ nickname: compareUserName.toLowerCase() })
    });
}

export default Comparation;