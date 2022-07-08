import { useState } from 'react'
import { Todo } from './components/Todo'

import "./global.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full h-52 bg-gray-700 flex justify-center bg-center bg-no-repeat bg-[url('./assets/logo-todo.png')]"></div>
      <Todo/>
    </>
  )
}

export default App
