export default function UserData({ user }) {
    return (
        <div className="userCard cardPosition">
            <div>
                <img src='../pictures/bachira.jpeg' alt='bachira'></img>
            </div>
            <div className="list">
                <p>{user.name}</p>
                <p>{user.phone}</p>
                <div className="btn3">
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </div>
        </div>
    )
}