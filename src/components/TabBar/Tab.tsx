import './Tab.css';
import { PagePath } from '../../resources/constants'

interface PropsType {
    title: string;
    path: string;
    isActive: boolean;
    onNavigate: (e: string) => void;
}

const Tab: React.FC<PropsType> = props => {
    return (
        <div className={`tab ${props.isActive && 'active'}`} onClick={() => {
            props.onNavigate && props.onNavigate(props.path);
        }}>
            {props.title}
            <div className="line" style={{ backgroundColor: tabColors[props.path] }}></div>
        </div>
    );
}

const tabColors: { [key: string]: string } = {
    [PagePath.Main]: "#F98365",
    [PagePath.Repos]: "#CDDA95",
    [PagePath.Compare]: "#A1DFFB",
}

export default Tab;