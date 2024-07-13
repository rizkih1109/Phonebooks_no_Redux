import TopBoard from "./TopBoard"
import UserCard from "./UserCard"
import axios from 'axios'
import { useState } from "react";
import { useEffect } from 'react';
import AddUser from "./AddUser";

export default function MainBoard() {

    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState('')
    const [sort, setSort] = useState('asc')

    useEffect(() => {
        axios.get('http://localhost:3000/api/phonebooks', {
            params: {
                keyword: keyword,
                sort: sort
            }
        }).then((response) => {
            if (response.data) setUsers(response.data.Phonebooks)
        });
    }, [keyword, sort])

    const PostUser = (name, phone) => {
        const id = Date.now().toString()
        setUsers([
            { id, name, phone },
            ...users
        ])
        axios.post('http://localhost:3000/api/phonebooks', {
            name, phone
        }).then((response) => {
            setUsers((newData) => {
                return newData.map((item) => {
                    if (item.id === id) item.id = response.data.id
                    return item;
                })
            })
        }).catch(() => {
            alert('Data gagal ditambahkan')
        })
    }

    const EditUser = (id, name, phone) => {
        axios.put(`http://localhost:3000/api/phonebooks/${id}`, {
            name, phone
        }).then((response) => {
            setUsers((newData) => {
                return newData.map((item) => {
                    if (item.id === id) {
                        item.name = response.data.name;
                        item.phone = response.data.phone;
                    }
                    return item;
                })
            })
        }).catch((err) => {
            console.log(err)
            alert('Data gagal ditambahkan')
        })
    }

    const editAvatar = (id, avatar) => {
        axios.put(`http://localhost:3000/api/phonebooks/${id}/avatar`, {
            avatar
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setUsers((newData) => {
                return newData.map((item) => {
                    if (item.id === id) {
                        item.avatar = response.data.avatar
                    }
                    return item;
                })
            })
        }).catch((err) => {
            console.log(err)
            alert('Data gagal ditambahkan')
        })
    }

    const removeUser = (id) => {
        axios.delete(`http://localhost:3000/api/phonebooks/${id}`).then((response) => {
            setUsers(users.filter(item => item.id !== id))
        }).catch(() => alert('Data gagal dihapus'))
    }

    return (
        <div>
            <div>
                <AddUser add={PostUser} />
            </div>
            <div>
                <TopBoard keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} />
            </div>
            <div className='board'>
                <UserCard users={users} remove={removeUser} edit={EditUser} avatar={editAvatar} />
            </div>
        </div>
    )
}