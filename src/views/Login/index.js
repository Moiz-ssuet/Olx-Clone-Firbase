import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../Config/Firebase'
import './index.css'

function Login() {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
const navigate=useNavigate()

    const signin = async () => {
        //async await === Promise === Asynchorous Function 
        setLoading(true)
        const { email, password } = form
        try {
            var result = await login(email, password)
            navigate("/")
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
            <div className="loginParentDiv">
                <img width="180px" height="180px" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OLX-Logo.png/800px-OLX-Logo.png"}></img>
                    <br />
                    <input
                        onChange={(e) => updateForm(e, 'email')} placeholder="Email"
                        className="input"
                    />
                    <br />
                    <br />
                    <input
                        onChange={(e) => updateForm(e, 'password')} placeholder="Password"
                        className="input"
                        type="Password"
                        
                    />
                    <br />
                    <br />
                    {!loading ?
            <>
                <button onClick={signin}>Login</button>
                <a onClick={()=>{navigate('/register')}}>Signup</a>
            </>
            :
            <>
                <img  width="30" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
            </>
        }                    
            </div>
        </div>
    )
}

export default Login