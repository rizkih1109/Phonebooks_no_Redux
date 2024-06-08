import TopBoard from "./TopBoard"
import UserCard from "./UserCard"


export default function MainBoard() {
    const users = [
        { name: 'Ahmad Jauhari', phone: '081222001' },
        { name: 'Vivi', phone: '081222001' },
        { name: 'Yoshua', phone: '081222001' },
        { name: 'Ahmad Jauhari', phone: '081222001' },
        { name: 'Vivi', phone: '081222001' },
        { name: 'Yoshua', phone: '081222001' }
    ]


    return (
        <div>
            <div>
                <TopBoard />
            </div>
            <div className='board'>
                <UserCard users={users} />
            </div>
        </div>
    )

}