import "./Loader.css";
import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import { getRandomGeneralColor } from "../../resources/colors";
import { useEffect, useState } from 'react';

interface PropsType {
    withoutLabel?: boolean;
    delay?: number;
}

const Loader: React.FC<PropsType> = props => {
    const [isStartLoader, setIsStartLoader] = useState(!props.delay);

    useEffect(() => {
        !props.delay && setTimeout(() => setIsStartLoader(true), props.delay);
    }, [props.delay]);

    return (<>
        {isStartLoader &&
            <div className="hashLoader">
                <HashLoader size={150} color={getRandomGeneralColor()} />
                {!props.withoutLabel && <span>Collecting information...</span>}
            </div>}
    </>);
}

export default Loader;