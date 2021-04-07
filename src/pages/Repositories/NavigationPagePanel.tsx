import { useEffect, useRef, useState } from 'react';
import './NavigationPagePanel.css'

type PropsType = {
    currentReposPage: number;
    setCurrentPage: (x: number) => void;
    pageCount: number;
}

function NavigationPagePanel(props: PropsType) {
    const navButtonPanel = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        setButtonsStyle(props.currentReposPage);
        
    }, [props.currentReposPage]);


    const fillNavigationButtons = (to: number, from: number) => {
        const result = [];
        for (let i = to; i <= from; i++) {
            if(i === 1) {
                result.push(<button className="activePage">{i}</button>);
                continue;
            }
            result.push(<button>{i}</button>);
        }
        return result;
    }

    const setNavigationPagePanel = (currentPage: number) => {
        const result = [];
        const pageCount = props.pageCount;
        if (pageCount > 10 && currentPage < 6) {
            result.push(...fillNavigationButtons(1, 6));
            result.push(<span>{"..."}</span>);
            result.push(<button>{pageCount}</button>);
            return result;
        }
        if (pageCount > 10 && currentPage >= 6 && currentPage < pageCount - 3) {
            result.push(<button className="activePage">{1}</button>);
            result.push(<span>{"..."}</span>);
            result.push(...fillNavigationButtons(currentPage - 2, currentPage + 2));
            result.push(<span>{"..."}</span>);
            result.push(<button>{pageCount}</button>);
            return result;
        }
        if (pageCount > 10 && currentPage >= pageCount - 4) {
            result.push(<button className="activePage">{1}</button>);
            result.push(<span>{"..."}</span>);
            result.push(...fillNavigationButtons(pageCount - 4, pageCount));
            return result;
        }
        result.push(...fillNavigationButtons(1, pageCount));
        return result;
    }

    const choosePage = (target: Element) => {
        if (target.tagName != 'BUTTON') return;
        props.setCurrentPage(+(target?.textContent || "1"));
    }

    const setButtonsStyle = (currentPage: number) => {

        console.log(navButtonPanel?.current?.children, "ITEMS");
        console.log(currentPage);
        for (let i = 0; i < (navButtonPanel?.current?.children?.length || 0); i++) {
            if (navButtonPanel?.current?.children.item(i)?.textContent === `${currentPage}`) {
                navButtonPanel?.current?.children.item(i)?.classList.add("activePage");
                continue;
            }
            navButtonPanel?.current?.children.item(i)?.classList.remove("activePage");
        }
    }

    return (
        <div className="navigationPagePanel">
            <button className="prevButton" onClick={() => props.setCurrentPage(props.currentReposPage > 1 ? props.currentReposPage - 1 : 1)}>
                {"< Previous"}
            </button>
            <div className="navButtons" ref={navButtonPanel} onClick={(e) => {
                choosePage(e.target as Element);
            }}>
                {setNavigationPagePanel(props.currentReposPage)}
            </div>
            <button className="nextButton" onClick={() => {
                const lastPage = props.pageCount;//(navButtonPanel?.current?.children?.length || 1);
                props.setCurrentPage(props.currentReposPage < lastPage ? props.currentReposPage + 1 : lastPage);
            }}>{"Next >"}</button>
        </div>
    );
}

export default NavigationPagePanel;