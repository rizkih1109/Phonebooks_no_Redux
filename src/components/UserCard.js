import UserData from "./UserData";

export default function UserCard({ users = [] }) {
    const cards = users.map((item, index) => (<UserData user={item} />))

    return cards
}