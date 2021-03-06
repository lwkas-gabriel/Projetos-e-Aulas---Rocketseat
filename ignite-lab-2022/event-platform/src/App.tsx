import { gql, useQuery } from "@apollo/client"
import { Event } from "./pages/Event";

const GET_LESSONS_QUERY = gql`
  query{
    lessons{
      id
      title
    }
  }
`

interface iLesson {
  id: string;
  title: string;
}

function App() {
  const { data } = useQuery(GET_LESSONS_QUERY);

  return (
    <Event />
  )
}

export default App
