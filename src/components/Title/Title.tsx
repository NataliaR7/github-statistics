import './Title.css';

interface PropsType {
    title: string;
}

const Title: React.FC<PropsType> = (props) => {
    return (
        <div className="head">
            <span>{props.title}</span>
        </div>
    );
}

export default Title;