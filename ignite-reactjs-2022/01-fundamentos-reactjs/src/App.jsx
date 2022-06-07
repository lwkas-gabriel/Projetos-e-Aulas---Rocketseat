import { Header } from "./components/Header"
import { Post } from "./Post"
import "./global.css"

export function App() {
  return (
    <div>
      <Header />
      <Post
        author="Lucas Gabriel"
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus repudiandae id nesciunt ad dignissimos at iure aliquid soluta ullam perspiciatis."
      />

      <Post 
        author="Teste"
        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, minus?"
      />

    </div>
    
  )
}