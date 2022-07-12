// import logo from "../assets/logo-todo.png"

import { PlusCircle } from "phosphor-react";
import { useState } from "react";

export function TodoAddNew(){
    const [items, setItems] = useState([])
    const [newItemText, setNewItemText] = useState("");

    function handleAddNewItem(){
        event?.preventDefault();

        setItems(...items, newItemText)
    }

    function handleNewItemChange(){
        setNewItemText(event?.target.value)
    }

    return (
        <form onSubmit={handleAddNewItem} className="flex relative top-[-27px] bg-transparent ml-auto mr-auto w-[736px] gap-2 font-sans">
            <input name="item" className="h-13 w-full rounded-lg text-gray-100 bg-gray-500 placeholder-gray-300 pl-4" type="text" placeholder="Adicione uma nova tarefa" onChange={handleNewItemChange} />
            <button type="submit" value="Submit" className="flex justify-center items-center gap-2 text-gray-100 bg-blue-600 w-[90px] p-4 h-13 rounded-lg">Criar<PlusCircle size={15}/></button>
        </form>
    )
}