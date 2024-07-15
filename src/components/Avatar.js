import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Avatar({ avatar }) {

    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()

    function handleImage(e) {
        if (e.target.files || e.target.files.length > 0) setImage(e.target.files[0])
    }

    function getImage() {
        const formData = new FormData()
        formData.append('avatar', image)
        avatar(state.id, formData)
        navigate('/')
    }

    return (
        <div className="container">
            <form onSubmit={getImage}>
                <div className="body">
                    <div>
                        <input className="input-control" type="file" onChange={handleImage}/>
                    </div>
                    <div >
                        <img src={state.avatar == null ? '../pictures/Defaultavatar.png' : `http://localhost:3000/images/${state.avatar}`} alt="avatar"/>
                    </div>
                </div>
                <div className="foot2">
                    <button className="btnAva" type="submit" ><i className="fa-solid fa-floppy-disk"></i></button>
                    <button className="btnAva" onClick={() => navigate('/')}><i className="fa-solid fa-rotate-left"></i></button>
                </div>
            </form>
        </div>
    )
}