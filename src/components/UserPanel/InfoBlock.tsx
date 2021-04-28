interface PropsType {
    label: string;
    content: string;
    isSmall: boolean;
    isLink?: boolean
}

const InfoBlock: React.FC<PropsType> = props => {
    const { label, content, isSmall, isLink } = props;
    return (<>
        <span className={`label ${isSmall && 'small'}`} key={label}>{label}</span>
        {!isLink
            ? <span className="canSelect" key={content}>{content}</span>
            : <a href={content} target="_blank" key={content}>{content}</a>}
    </>)
}

export default InfoBlock;