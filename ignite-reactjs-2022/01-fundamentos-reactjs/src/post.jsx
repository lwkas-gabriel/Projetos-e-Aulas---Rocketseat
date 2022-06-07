// dentro de props é recebido um objeto que vai ter, props: {author: "", content: "" }

export function Post(props){
    return (
    <div>
        <strong>{props.author}</strong> 
        <p>{props.content}</p>
    </div>
    )
}