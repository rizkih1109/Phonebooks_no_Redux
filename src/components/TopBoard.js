import { Link } from "react-router-dom";

function AscBtn ({sort, setSort}) {
    return (
        <button className="btn1" onClick={() => setSort('desc')}><i className="fa-solid fa-arrow-down-z-a"></i></button>
    )
}

function DescBtn ({sort, setSort}) {
    return (
        <button className="btn1" onClick={() => setSort('asc')}><i className="fa-solid fa-arrow-down-a-z"></i></button>   
    )
}

export default function TopBoard({ keyword, setKeyword, sort, setSort }) {

    const search = (event) => {
        const { value } = event.target
        setKeyword(value)
    }

    return (
        <div className="barPosition">
            {sort === 'asc' || sort.sort === 'asc' ? <AscBtn sort={sort} setSort={setSort} /> : <DescBtn sort={sort} setSort={setSort} />}
            <input type="text" value={keyword} onInput={search} placeholder='search'></input>
            <Link to={'/add'}>
                <button className="btn1"><i className="fa-solid fa-user-plus"></i></button>
            </Link>
        </div>
    )
}