import UserItem from "./UserItem";

export default function UserList({ users = [] }) {
    const cards = users.map((item, index) => (<UserItem user={item} />))

    return cards
}