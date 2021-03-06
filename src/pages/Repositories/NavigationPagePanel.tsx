import './NavigationPagePanel.css';
import { useEffect, useRef, RefObject } from 'react';

interface PropsType {
    currentReposPage: number;
    setCurrentPage: (x: number) => void;
    pageCount: number;
}

const NavigationPagePanel: React.FC<PropsType> = props => {
    const navButtonPanel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setButtonsStyle(props.currentReposPage, navButtonPanel);
    }, [props.currentReposPage]);

    return (
        <nav className="navigationPagePanel">
            <button className="prevButton" onClick={() => props.setCurrentPage(props.currentReposPage > 1 ? props.currentReposPage - 1 : 1)}>
                {"< Previous"}
            </button>
            <div className="navButtons" ref={navButtonPanel} onClick={(e) => {
                const target = e.target as Element;
                if (target.tagName != 'BUTTON') return;
                props.setCurrentPage(+(target?.textContent || "1"));
            }}>
                {setNavigationPagePanel(props.currentReposPage, props.pageCount)}
            </div>
            <button className="nextButton" onClick={() => {
                const lastPage = props.pageCount;
                props.setCurrentPage(props.currentReposPage < lastPage ? props.currentReposPage + 1 : lastPage);
            }}>{"Next >"}</button>
        </nav>
    );
}

function setButtonsStyle(currentPage: number, navButtonPanel: RefObject<HTMLDivElement>) {
    for (let i = 0; i < (navButtonPanel?.current?.children?.length || 0); i++) {
        if (navButtonPanel?.current?.children.item(i)?.textContent === `${currentPage}`) {
            navButtonPanel?.current?.children.item(i)?.classList.add("activePage");
            continue;
        }
        navButtonPanel?.current?.children.item(i)?.classList.remove("activePage");
    }
}

function setNavigationPagePanel(currentPage: number, pageCount: number) {
    const result = [];
    if (pageCount > 10 && currentPage < 6) {
        result.push(...fillNavigationButtons(1, 6));
        result.push(<span key={"points"}>{"..."}</span>);
        result.push(<button key={`${result.length}`}>{pageCount}</button>);
        return result;
    }
    if (pageCount > 10 && currentPage >= 6 && currentPage < pageCount - 3) {
        result.push(<button className="activePage" key={`${result.length}`}>{1}</button>);
        result.push(<span key={`${result.length}`}>{"..."}</span>);
        result.push(...fillNavigationButtons(currentPage - 2, currentPage + 2));
        result.push(<span key={`points`}>{"..."}</span>);
        result.push(<button key={`${pageCount + 1}`}>{pageCount}</button>);
        return result;
    }
    if (pageCount > 10 && currentPage >= pageCount - 4) {
        result.push(<button className="activePage" key={`${result.length}`}>{1}</button>);
        result.push(<span key={`${result.length}`}>{"..."}</span>);
        result.push(...fillNavigationButtons(pageCount - 4, pageCount));
        return result;
    }
    result.push(...fillNavigationButtons(1, pageCount));
    return result;
}

function fillNavigationButtons(to: number, from: number) {
    const result = [];
    for (let i = to; i <= from; i++) {
        if (i === 1) {
            result.push(<button className="activePage" key={`${i}`}>{i}</button>);
            continue;
        }
        result.push(<button key={i}>{i}</button>);
    }
    return result;
}

export default NavigationPagePanel;