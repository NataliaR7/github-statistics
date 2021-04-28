import './Contributor.css';

interface PropsType {
    data: { 
        count: number, 
        name: string, 
        avatar: string, 
        url: string 
    }
}
const Contributor: React.FC<PropsType> = props => {
    const data = props.data;
    return (
        <div className="partner" key={data.url}>
            <a href={data.url} target="_blank" rel="noreferrer">
                <img src={data.avatar} alt="partnerAvatar"></img>
            </a>
            <span className="canSelect">{data.name}</span>
        </div>
    );
}

export default Contributor;
