import './General.css';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import TabBar from '../../containers/TabBar';
import UserPanel from '../../components/UserPanel/UserPanel';
import MainInfo from '../MainInfo/MainInfo';
import Repositories from '../../containers/Repositories';
import Comparation from '../../containers/Comparation';
import Cookies from 'js-cookie';

const General: React.FC = () => {
    return (
        <div className="General">
            {isLoggedIn() && <Redirect to="/login" />}
            <TabBar />
            <UserPanel />

            <Switch>
                <Redirect exact from="/" to="/main" />
                <Route path="/main" component={MainInfo} />
                <Route path="/repos" component={Repositories} />
                <Route path="/compare" component={Comparation} />
            </Switch>
        </div>
    );
}

function isLoggedIn() {
    return Cookies.get("isLoggedIn") && Cookies.get("isLoggedIn") !== "true" && Cookies.get("token");
}

export default General;