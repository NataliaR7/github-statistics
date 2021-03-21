import './RepoBall.css';
import starSvg from '../../svg/starSvg';
import linkSvg from '../../svg/linkSvg';

type RepoBallType = {

}

function RepoBall(props: RepoBallType) {
    return (
        <div className="repoBall">
            {/* <div className="ballContent"> */}
            <div className="stars">{starSvg()}<span>{21}</span></div>
            <div className="infoRepo">
                <div className="nameRepo">
                    <span>{"overpriced-coffee"}</span>
                    <span className="fork">{"Forked"}</span>
                </div>
                <span>{linkSvg()}</span>
            </div>
            <div className="updateRepo">
                <span>{"updated"}</span>
                <span>{"on 24 Dec 2020"}</span>
            </div>
            {/* </div> */}
        </div>
    );
}

export default RepoBall;