import UserData from "./UserData";

export default function UserCard({ users = [], remove, edit, avatar }) {
    const cards = users.map((item, index) => (
        <UserData user={item} key={index} remove={() => remove(item.id)} edit={edit} avatar={avatar} />
    ))
    return cards
}