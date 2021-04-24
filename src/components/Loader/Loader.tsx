import React, { useEffect, useState } from 'react';
import HashLoader from "react-spinners/HashLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import { getRandomGeneralColor } from "../../resources/colors"
import "./Loader.css"

interface PropsType {

}

function Loader(props: PropsType) {

    return (
        <div className="hashLoader">
            <HashLoader size={150} color={getRandomGeneralColor()} />
            <span>Collecting information...</span>
        </div>
    );
}

export default Loader;