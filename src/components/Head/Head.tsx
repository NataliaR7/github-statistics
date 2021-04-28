import './Head.css';

interface PropsType {
    title: string;
}

const Head: React.FC<PropsType> = (props) => {
    return (
        <div className="head">
            <span>{props.title}</span>
        </div>
    );
}

export default Head;