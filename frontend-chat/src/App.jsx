import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast from 'react-hot-toast'
import WelcomePage from './components/WelcomePage'
import JoinRoom from './components/JoinRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <WelcomePage /> */}
      <JoinRoom />
    </div>
  )
}

export default App
