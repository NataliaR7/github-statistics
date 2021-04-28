import './UserAdditional.css';
import InfoBlock from './InfoBlock'

interface PropsType {
    data: {
        location?: string | null;
        email?: string | null;
        site?: string | null;
        name?: string | null;
        orgs?: {
            avatar: string;
            login: string;
            url: string;
        }[]
    }
};

const UserAdditional: React.FC<PropsType> = props => {
    const data = props.data;
    const isSmall = (data.name && data.location && data.email && data.site) ? true : false;
    return (
        <div className="userAdditional">
            { data.name && <InfoBlock label="name" content={data.name} isSmall />}
            { data.location && <InfoBlock label="location" content={data.location} isSmall />}
            { data.email && <InfoBlock label="e-mail" content={data.email} isSmall />}
            { data.site && <InfoBlock label="site" content={data.site} isLink={true} isSmall />}
            { data.orgs?.length !== 0 && getOrgs(data.orgs, isSmall)}
        </div>
    );
}

function getOrgs(orgs: PropsType["data"]["orgs"], isSmall: boolean) {
    return (
        <div className={"organizations"}>
            <span>organizations</span>
            <div className={`pictures ${isSmall && 'small'}`}>
                {orgs && orgs.map((org) =>
                    <a href={org.url} target="_blank" key={org.url}>
                        <img src={org.avatar} alt={org.login} title={org.login} />
                    </a>
                )}
            </div>
        </div>
    )
}

export default UserAdditional;