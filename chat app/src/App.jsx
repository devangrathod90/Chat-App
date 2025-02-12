import io from 'socket.io-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Join from './components/join'
import Chat from './components/chat'


const EndPoint = 'http://localhost:4500/'
const socket = io(EndPoint,{transport:['websoket']})

function App() {

  socket.on("connect",()=>{
    console.log("connected to server",socket.id)
  })
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App