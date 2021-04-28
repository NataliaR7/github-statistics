import { useState } from 'react';
import "./NicknameForm.css"

interface PropsType {
    title: string;
    setNickname: (x: string) => void;
}
const NicknameForm: React.FC<PropsType> = props => {
    const [isDisabled, setIsDisabled] = useState(true);

    return (
        <>
            <span>{props.title}</span>
            <input className="inputForm" type="text" onChange={(e) => {
                const inputText = e.target.value;
                if (inputText === '') {
                    !isDisabled && setIsDisabled(true);
                    return;
                }
                setIsDisabled(false);
                props.setNickname(e.target.value)
            }} />
            <input className="submitButton" type="submit" value="ok" disabled={isDisabled} />
        </>
    );
}

export default NicknameForm;