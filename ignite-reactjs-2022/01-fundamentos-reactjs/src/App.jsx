import { useState } from 'react'
import { Post } from "./post"

export function App() {
  return (
    <div>
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