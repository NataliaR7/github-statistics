import './Tab.css';
import { PagePath } from '../../resources/constants';

interface PropsType {
    title: string;
    path: string;
    isActive: boolean;
    onNavigate: (e: string) => void;
    deactiveteRepo: () => void;
}

const Tab: React.FC<PropsType> = props => {
    return (
        <nav className={`tab ${props.isActive && 'active'}`} onClick={() => {
            props.path !== PagePath.Repos && props.deactiveteRepo();
            props.onNavigate && props.onNavigate(props.path);
        }}>
            {props.title}
            <div className="line" style={{ backgroundColor: tabColors[props.path] }}></div>
        </nav>
    );
}

const tabColors: { [key: string]: string } = {
    [PagePath.Main]: "#F98365",
    [PagePath.Repos]: "#CDDA95",
    [PagePath.Compare]: "#A1DFFB",
}

export default Tab;