import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TopBoard() {
    return (
        <div className="barPosition">
            <button className="btn1"><FontAwesomeIcon icon="fa-solid fa-arrow-up-z-a" /></button>
            <input type="text"></input>
            <button className="btn1"><i class="fa-solid fa-user-plus"></i></button>
        </div>
    )
}