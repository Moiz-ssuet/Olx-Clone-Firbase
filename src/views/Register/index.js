import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register,uploadImage,updateProfile } from '../../Config/Firebase'
import './index.css'

function Register() {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [imageURI, setImageURI] = useState()
const navigate=useNavigate()

    const signup = async () => {
        //async await === Promise === Asynchorous Function 
        setLoading(true)
        try {
            var result = await register(form)
            const url = await uploadImage(imageURI)
            await updateProfile({ profilePic: url })
            
            navigate('/login')
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)

        }
    }

    const updateForm = (e, key) => {
        setForm({ ...form, [key]: e.target.value })
    }

    return (
        <div>
            <div className="signupParentDiv">
                <img width="180" height="180px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OLX-Logo.png/800px-OLX-Logo.png"></img>
                <br /><br />
                <label>Upload profile</label><br />
                <input
                    type="file"
                    onChange={(e) => setImageURI(e.target.files[0])}
                />
                <br />
                <br />
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => updateForm(e, 'name')}
                />
                <br />
                <br />
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => updateForm(e, 'email')}
                />
                <br />
                <br />
                <input
                    className="input"
                    type="Password"
                    placeholder="Password"
                    onChange={(e) => updateForm(e, 'password')}
                />
                <br />
                <br />
                {!loading ?
                    <>
                        <button onClick={signup}>Register</button>
                        <spam onClick={() => { navigate('/login') }}>Login</spam>
                    </>
                    :
                    <>
                        <img width="30" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
                    </>
                }

            </div>
        </div>


    )
}

export default Register