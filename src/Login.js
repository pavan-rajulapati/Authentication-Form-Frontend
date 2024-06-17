import React, { useState } from 'react'
import {Link , useNavigate } from 'react-router-dom'
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {
    const [data, setData] = useState({
        mail: '',
        password: ''
    });

const history = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(data.userName === '' || data.mail === '' || data.password === ''){
            toast.error('Feilds Should not be mpty')
        }else{
           try {
            const response = await axios.post('http://localhost:5000/api/user/login',data)
            toast.success(response.data.message)
            history('/')
           } catch (error) {
            toast.error(error.response.data.message)
           }
        }
    }

  return (
    <div>
      <div className="loginContaner">
        <div className="login">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div class="heading">
                      <span>Login</span>
                    </div>
                    <div className="inputFileds">
                        <input type="text" name='mail' onChange={handleInput} placeholder='Enter Mail' value={data.mail}/>
                        <input type="password" name='password' onChange={handleInput} placeholder='Enter Password' value={data.password}/>
                    </div>
                    <div className="Btn">
                        <button type='submit'>Login</button>
                    </div>
                    <div class="loginSignin">
                      <p>If you don't have an account ? <Link to={'/register'}>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Login
