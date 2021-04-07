import './Comparation.css';
import UserLanguages from "../../components/UserLanguages/UserLanguages"
import UserPanel from "../../components/UserPanel/UserPanel"
import NicknameForm from "../../components/NicknameForm/NicknameForm"
import UserRepositories from "../../components/UserRepositories/UserRepositories"
import { useState } from 'react';

function Comparation() {
    const [compareUserName, setCompareUserName] = useState("");
    return (
        <div className="comparation">
            {compareUserName.length !== 0 ?
                <div className="comparationForm">
                    <form action="" method="post" className="loginForm" onSubmit={(e) => { }}>

                        <NicknameForm title="enter github nickname" setNickname={() => { }} />
                        {/* {setCompareUserName(compareUserName => compareUserName = "NataliaR7")} */}

                    </form>
                </div>
                : <div className="comparationContent">
                    <UserPanel username="NataliaR7" />
                    <div className={"dataCompare"}>
                        

                    </div>
                </div>
            }

        </div>
    );
}

export default Comparation;