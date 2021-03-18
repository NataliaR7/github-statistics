import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import TabBar from '../../components/TabBar/TabBar';
import UserPanel from '../../components/UserPanel/UserPanel';
import MainInfo from '../MainInfo/MainInfo';
import Repositories from '../Repositories/Repositories';
import './General.css'

function General() {

    return (
        <div className="General">
            <TabBar />
            <UserPanel />

            <Switch>
                <Redirect exact from="/" to="/main" />
                <Route path="/main" component={MainInfo} />
                <Route path="/about" />
                <Route path="/repo" component={Repositories} />
            </Switch>
        </div>
    );
}

export default General;