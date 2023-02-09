import { Header } from "./components/Header"
import { Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"

import styles from './App.module.css'

import './global.css'

function App() {
  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          <Post
          author="test 1"
          content="Novo post 1"
          />

          <Post
          author="test 2"
          content="Novo post 2"
          />
        </main>
      </div>
    </div>
  )
}

export default App
