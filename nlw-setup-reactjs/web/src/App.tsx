import { useState } from 'react'
import "./styles/global.css"
import { Habit } from './components/Habit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Habit completed={3}/>
      <Habit completed={2}/>
      <Habit completed={30}/>
    </>
  )
}

export default App
