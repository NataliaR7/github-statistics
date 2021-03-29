import RepositoryItem from "../../components/RepositoryItem/RepositoryItem"
import "./Repositories.css"

function Repositories() {
    return (
        <div className="repositoriesPage">
            <div className="repositories">
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
            </div>
            <div className="pageButtons">
                <button className="prevButton">{"< Previous"}</button>
                <button>{1}</button>
                <button>{2}</button>
                <button className="nextButton">{"Next >"}</button>
            </div>
        </div>
    );
}

export default Repositories;