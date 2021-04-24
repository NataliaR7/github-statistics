import './Partners.css';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Contributor from './Contributor'
import PartnerPanel from './PartnerPanel'

function Partners() {
    return (
        <div className="partners">
            <div className="head">
                <span>work partners</span>
            </div>
            <PartnerPanel />
        </div>
    );
}

export default Partners;
