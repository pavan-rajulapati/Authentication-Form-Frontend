import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Register = () => {
    const [data, setData] = useState({
        userName: '',
        mail: '',
        password: ''
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(data.userName === '' || data.mail === '' || data.password === ''){
            toast.error('Feilds Should not be mpty')
        }else if(!validateEmail(data.mail)){
            toast.error('Enter a valid email')
        }else{
           try {
            const response = await axios.post('http://localhost:5000/api/add/user',data)
            toast.success(response.data.message)
            setData({
              userName: '',
              mail: '',
              password: ''
            })
           } catch (error) {
            toast.error(error.response.data.message)
           }
        }
    }

  return (
    <div>
      <div className="registerContaner">
        <div className="register">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div class="heading">
                      <span>Register</span>
                    </div>
                    <div className="inputFileds">
                        <input type="text" name='userName' autoComplete='off' onChange={handleInput} placeholder='Enter Username' value={data.userName}/>
                        <input type="text" name='mail' onChange={handleInput} placeholder='Enter Mail' value={data.mail}/>
                        <input type="password" name='password' onChange={handleInput} placeholder='Enter Password' value={data.password}/>
                    </div>
                    <div className="Btn">
                        <button type='submit'>Register</button>
                    </div>
                    <div class="registerSignin">
                      <p>If you already have an account ? <Link to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Register
