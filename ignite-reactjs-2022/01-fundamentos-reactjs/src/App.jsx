import { Header } from "./components/Header"
import { Post } from "./Post"

import "./global.css"

import styles from "./App.module.css"
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <div>
      
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Lucas Gabriel"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus repudiandae id nesciunt ad dignissimos at iure aliquid soluta ullam perspiciatis."
          />

          <Post 
            author="Teste"
            content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, minus?"
          />
        </main>
      </div>

    </div>
    
  )
}