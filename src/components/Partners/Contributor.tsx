import './Contributor.css';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

interface ContributorType {
    data: { 
        count: number, 
        name: string, 
        avatar: string, 
        url: string 
    }
}

function Contributor(props: ContributorType) {
    const data = props.data;
    return (
        <div className="partner">
            <a href={data.url} target="_blank">
                <img src={data.avatar} alt="partnerAvatar"></img>
            </a>
            <span>{data.name}</span>
        </div>
    );
}

export default Contributor;
