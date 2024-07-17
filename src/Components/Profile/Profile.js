import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './profile.css'
import { useNavigate } from 'react-router-dom'
function Profile() {
    const [age,setAge] = useState()
    const[gender,setGender] = useState("")
    const[dob,setDob] = useState()
    const[phone,setPhone] = useState()
    const base_url ='http://localhost:5000'
    const name = localStorage.getItem("name")
    const navigate= useNavigate()
    const handleProfile = async(e)=>{
        e.preventDefault()
     try {
        const response = await axios.post(`${base_url}/user/profile`,{age,gender,dob,phone})
        if(response.status==200){
            toast.success(response.data.message)
            setAge('');
            setGender('');
            setDob('');
            setPhone('');
        }
     } catch (error) {
        toast.error(error.response.data.message)
     }
    }

    const handleLogout =() =>{
        localStorage.removeItem("name")
        navigate("/")
    }
  return (
    <div className='profilecontainer'>
        <ToastContainer/>
        <h3> Welcome {name}</h3>
        <p>Please fill the below details </p>
        <div className='profile'>
        <div >
        <label htmlFor='age'>Age : </label>
        <input
                            type='Number'
                            required
                            placeholder='Age'
                            id='age'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
        </div>
      <div>
      <label htmlFor='gender'>Gender : </label>
        <input type="radio" id="male"  value="Male" onChange={(e)=> setGender(e.target.value)}/>
  <label for="male">Male</label>
  <input type="radio" id="female" value="female"onChange={(e)=> setGender(e.target.value)}/>
  <label for="female">female</label>
        
      </div>
      <div>
        <label htmlFor='dob'> Date of Birth</label>
        <input
                            type='date'
                            required
                            placeholder='Date of birth'
                            id='dob'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
      </div>
      <div>
        <label htmlFor='phone'> Mobile Number</label>
        <input
                            type='Number'
                            required
                            placeholder='Mobilenumber'
                            id='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
      </div>

      <button className='add'onClick={handleProfile}>Add Profile</button>
        </div>
       <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile