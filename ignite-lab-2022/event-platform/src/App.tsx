import { gql, useQuery } from "@apollo/client"
import { Header } from "./components/Header";

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
    <Header />
  )
}

export default App
