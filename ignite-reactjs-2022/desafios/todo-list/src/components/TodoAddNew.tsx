// import logo from "../assets/logo-todo.png"

import { PlusCircle } from "phosphor-react";

export function TodoAddNew(){
    return (
        <div className="flex relative top-[-27px] bg-transparent ml-auto mr-auto w-[736px] gap-2 font-sans">
            <input className="h-13 w-full rounded-lg bg-gray-500 placeholder-gray-300 pl-4" type="text" placeholder="Adicione uma nova tarefa" />
            <button className="flex justify-center items-center gap-2 text-gray-100 bg-blue-600 w-[90px] p-4 h-13 rounded-lg">Criar<PlusCircle size={15}/></button>
        </div>
    )
}