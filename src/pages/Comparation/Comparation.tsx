import './Comparation.css';
import UserLanguages from "../../components/UserLanguages/UserLanguages"
import UserPanel from "../../components/UserPanel/UserPanel"
import UserRepositories from "../../components/UserRepositories/UserRepositories"

function Comparation() {
    const activityData = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 9,
        h: 7,
        i: 8,
        k: 10,
        l: 11,
        m: 12,
    };
    const languagesData = { "c#": 5, "ht": 3, "gh": 7, "js": 2 }
    return (
        <div className="comparation">
            <UserPanel />
            <div className={"dataCompare"}>
                <div className="upPanel">
                    <UserLanguages data={languagesData} />
                </div>
                <div className="downPanel">
                    <UserRepositories />
                </div>
            </div>
        </div>
    );
}

export default Comparation;