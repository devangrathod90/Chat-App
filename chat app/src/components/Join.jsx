import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import chat from '../assets/chat.png'
import { Link } from 'react-router-dom'

let user;

const sendUser = ()=>{ user = document.getElementById('joinInput').value;
  document.getElementById("joinInput").value="";
}

const Join = () => {

  const [name,setName] = useState('');
    
  return (
    <div className='h-screen flex items-center justify-center ' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className=' md:border rounded-xl h-[500px] w-[800px] text-white  backdrop-blur-xs'>
        <div className='flex items-center justify-center p-10 '>
          <img src={chat} alt="" height={'150px'} width={"150px"} />
        </div>
        <div className='flex items-center justify-center flex-col w-full'>
          <p className='text-4xl'>CHAT APP</p>
          <input onChange={(e)=>setName(e.target.value)} id='joinInput' placeholder='Enter your name' className='border-1 p-3 mt-5 w-[300px] focus:outline-none text-xl' type="text" />
          <Link onClick={(e)=>!name ? e.preventDefault():null} to={'/Chat'}><button onClick={sendUser} className='mt-5 text-2xl bg-blue-500 w-[300px] p-4 hover:bg-blue-400'>Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Join
export {user}