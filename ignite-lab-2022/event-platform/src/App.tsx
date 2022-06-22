import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react"

const GET_LESSONS_QUERY = gql `
  query{
    lessons{
      id
      title
    }
  }
`

interface iLesson{
  id: string;
  title: string;
}

function App() {
  const {data} = useQuery(GET_LESSONS_QUERY);

  return (
    <ul>
      {data?.lessons.map((lessons:iLesson) =>{
        return <li key={lessons.id}>{lessons.title}</li>
      })}
    </ul>
  )
}

export default App
