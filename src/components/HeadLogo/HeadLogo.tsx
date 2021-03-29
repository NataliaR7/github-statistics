import './HeadLogo.css';

function HeadLogo() {
    return (
        <div className="headLogo">
            <div className="headTitle">GitHub Statistics</div>
            <div className="linesHead">
                <div style={{backgroundColor: "#F9DE59"}}></div>
                <div style={{backgroundColor: "#E8A628"}}></div>
                <div style={{backgroundColor: "#F98365"}}></div>
                <div style={{backgroundColor: "#CDDA95"}}></div>
                <div style={{backgroundColor: "#A1DFFB"}}></div>
            </div>
        </div>
    );
}

export default HeadLogo;