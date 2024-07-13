import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Avatar({ avatar }) {

    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()
    console.log(state)

    function handleImage(e) {
        console.log(e.target.files)
        console.log(e.target.files[0])
        if (e.target.files || e.target.files.length > 0) setImage(e.target.files[0])
    }


    function getImage() {
        const formData = new FormData()
        formData.append('avatar', image)
        avatar(state.id, formData)
        console.log(formData, avatar)
        navigate('/')
    }

    return (
        <div className="container">
            <form onSubmit={getImage}>
                <div className="body">
                    <div>
                        <input className="input-control" id="avatar" type="file" name="avatar" onChange={handleImage}/>
                    </div>
                    {/* <div >
                        <img alt="avatar" className="preview" />
                    </div> */}
                </div>
                <div className="foot2">
                    <button className="btnAva" type="submit" ><i className="fa-solid fa-floppy-disk"></i></button>
                    <button className="btnAva" ><i className="fa-solid fa-rotate-left"></i></button>
                </div>
            </form>
        </div>
    )
}