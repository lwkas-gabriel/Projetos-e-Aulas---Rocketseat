import { TodoAddNew } from "./TodoAddNew";
import { TodoList } from "./TodoList";

export function Todo(){
    return (
        <div className="bg-gray-600 min-h-screen">
            <TodoAddNew/>
            <TodoList/>
        </div>
    )
}