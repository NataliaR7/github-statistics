import "./Loader.css";
import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import { getRandomGeneralColor } from "../../resources/colors";

interface PropsType {
    withoutLabel?: boolean;
}

const Loader: React.FC<PropsType> = props => {
    return (
        <div className="hashLoader">
            <HashLoader size={150} color={getRandomGeneralColor()} />
            {!props.withoutLabel && <span>Collecting information...</span>}
        </div>
    );
}

export default Loader;