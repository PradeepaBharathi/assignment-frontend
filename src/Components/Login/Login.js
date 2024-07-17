import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import './Login.css'
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const base_url = 'http://localhost:5000'
    const [account,setAccount] = useState("Login")
    const[email,setEmail] = useState("")
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[confirmpassword,setCpassword] = useState("")
    const nav = useNavigate()
    const handleLogin = async()=>{
        try{
            const response = await axios.post(`${base_url}/user/login`,{email,password})
          console.log(response)
        toast.success(response.data.message)
        localStorage.setItem("name",response.data.data.name)
        if(response.status==200){
            nav("/profile")
        }
        }
        catch(err){
         toast.error(err.response.data.message)
        }
    }

    const handleSignup = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(`${base_url}/user/signup`,{name,email,password,confirmpassword})
        console.log(response)
        if(response.status==200){
            nav("/profile")
        }
        toast.success(response.data.message)
        }
        catch(err){
         toast.error(err.response.data.message)
        }
    }
  return (
    <div className='acc'>
        <ToastContainer/>

{account === 'Login' ? (
                <div className='login-form'>
                    <div className='frominput'>
                        <h3>Login</h3>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            required
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='btn-grp'>
                        <button className='login-btn' onClick={handleLogin}  >Login</button>
                        <button onClick={() => setAccount('register')} className='register-btn'>Create Account</button>
                    </div>
                </div>
            ) : (
                <div className='register-form'>
                    <div className='frominput'>
                        <h3>Register</h3>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            required
                            placeholder='Name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            required
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='frominput'>
                        <label htmlFor='password'>Confirm Password</label>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            id='password'
                            value={confirmpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>
                    <div className='btn-grp'>
                        <button className='register-btn' onClick={handleSignup} >Register</button>
                        <button onClick={() => setAccount('Login')} className='login-btn'>Login</button>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Login