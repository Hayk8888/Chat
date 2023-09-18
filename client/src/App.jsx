import { useState } from 'react'
import Login from "./components/Login.jsx"
import { Routes, Route} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path="/signin"  element={<Login/>} />
            <Route path="/signup"  element={<Signup/>} />
            <Route path="/chat" element={<Chat/>} />
        </Routes>
    </>
  )
}

export default App
