import React, { useState } from 'react'
import { login } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../api/AuthContext'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const auth = useAuth()
    const nav = useNavigate()


    const handleLogin=async()=>{
        const user={username,password}
       auth.setIsLoading(true)
        await login(user)
        .then(res=>{
            if(res.status === 200){
                auth.login()
                nav("/pending")
            }else{
                setErrors(["Invalid Username or Password"])
            }  
            auth.setIsLoading(false)          
        }).catch(err=>{alert(err); auth.setIsLoading(false)})
       
    }
    return (
        <form className='login-page'>
            <h1>Login</h1>
            {errors.map(err=>  <p className='text-danger'>{err}</p>)}           
            <div className="mb-3">
                <label htmlFor="username" className="form-label" >Username</label>
                <input type="text" className="form-control" id="username" onChange={(e)=>setUsername(e.target.value)} autoComplete='username' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password' />
            </div>
            <button className='btn btn-success' onClick={handleLogin}>Login</button>
        </form>
    )
}
