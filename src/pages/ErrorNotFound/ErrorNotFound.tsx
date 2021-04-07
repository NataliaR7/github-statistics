import './ErrorNotFound.css';
import getErrorSvg from "../../resources/errorSvg/errorSvg"
import { useState } from 'react';
import { Redirect } from 'react-router';


function ErrorNotFound() {
    const [isBack, setIsBack] = useState(false);
    return (
        <div className="errorNotFound">
            {isBack && <Redirect to="/nickname"/>}
            <div className="errorContent">
                {getErrorSvg()}
                <h1>SORRY!</h1>
                <span>USER NOT FOUND</span>
                <span>There is no user with this nickname</span>
                <span>Please try again!</span>
                <button onClick={() => setIsBack(true)}>go back</button>
            </div>

        </div>
    );
}

export default ErrorNotFound;