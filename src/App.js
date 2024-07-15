import './App.css';
import axios from 'axios'
import { useState } from "react";
import { useEffect } from 'react';
import Avatar from './components/Avatar';
import MainBoard from './components/MainBoard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';

export default function App() {

  const [users, setUsers] = useState([])
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('asc')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const readData = async (newPage) => {
    try {
      const response = await axios.get('http://localhost:3000/api/phonebooks', {
        params: {
          keyword: keyword,
          sort: sort,
          limit: 25,
          page: newPage
        }
      })
      const data = response.data.Phonebooks
      const pages = response.data.pages
      setTotalPage(pages)
      setUsers((prevUsers) => ([...prevUsers, ...data]))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        const newPage = page + 1
        setPage(newPage)
        readData(newPage)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);

  }, [page, totalPage])

  useEffect(() => {
    setUsers([]);
    setPage(1);
    readData(1);
  }, [keyword, sort]);

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

  const chnageAvatar = (id, avatar) => {
    axios.put(`http://localhost:3000/api/phonebooks/${id}/avatar`,
      avatar
      , {
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
    <Router>
      <Routes>
        <Route path="/" element={<MainBoard keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} users={users} remove={removeUser} edit={EditUser} />}></Route>
        <Route path="/add" element={<AddUser add={PostUser} />}></Route>
        <Route path="/avatar" element={<Avatar avatar={chnageAvatar} />}></Route>
      </Routes>
    </Router>
  );
}

