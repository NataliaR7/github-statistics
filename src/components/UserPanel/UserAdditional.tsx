import './UserAdditional.css';
import { octokit } from './UserPanel';

type PropType = {
    location?: string | null;
    email?: string | null;
    site?: string | null;
    name?: string | null;
    orgs?: {
        avatar: string;
        login: string;
        url: string;
    }[]
};

function getLabelInfo(label: string, content: string, isSmall: boolean) {
    const labelClass = isSmall ? " small" : "";
    return (<>
        <span className={"label" + labelClass}>{label}</span>
        <span className="canSelect">{content}</span>
    </>)
}

function getLinkInfo(label: string, content: string, isSmall: boolean) {
    const labelClass = isSmall ? " small" : "";
    return (<>
        <span className={"label" + labelClass}>{label}</span>
        <a href={content} target="_blank">{content}</a>
    </>)
}

async function setHref(orgLogin: string) {

    const orgReq = await octokit.request('GET /orgs/{org}', {
        org: orgLogin
    });
    window.open(orgReq.data.html_url);
}
async function setHref1(target: EventTarget & HTMLAnchorElement, orgLogin: string) {

    const orgReq = await octokit.request('GET /orgs/{org}', {
        org: orgLogin
    });
    target.href = orgReq.data.html_url;
    window.open(orgReq.data.html_url);
}

function getOrgs(orgs: PropType["orgs"], isSmall: boolean) {
    const organizationsClass = isSmall ? " small" : "";
    return (
        <div className={"organizations" }>
            <span>organizations</span>
            <div className={"pictures" + organizationsClass}>
                {orgs && orgs.map((org) =>
                    // <a href="#" target="_blank" onClick={(e) => { setHref(e.currentTarget, org.login) }}>
                        <img src={org.avatar} alt={org.login} title={org.login}  onClick={() => setHref(org.login) } />
                    /* </a> */
                )}
            </div>
        </div>
    )
}

function UserAdditional(props: PropType) {
    const isSmall = (props.name && props.location && props.email && props.site) ? true : false;
    return (
        <div className="userAdditional">
            { props.name && getLabelInfo("name", props.name, isSmall)}
            { props.location && getLabelInfo("location", props.location, isSmall)}
            { props.email && getLabelInfo("e-mail", props.email, isSmall)}
            { props.site && getLinkInfo("site", props.site, isSmall)}
            
            { props.orgs?.length !== 0 && getOrgs(props.orgs, isSmall)}
        </div>
    );
}

export default UserAdditional;