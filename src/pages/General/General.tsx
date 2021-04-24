import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import TabBar from '../../containers/TabBar';
import UserPanel from '../../components/UserPanel/UserPanel';
import MainInfo from '../MainInfo/MainInfo';
import Repositories from '../../containers/Repositories';
import Comparation from '../../containers/Comparation';
import './General.css'

function General() {

    return (
        <div className="General">
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

export default General;