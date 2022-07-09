import { TodoItem } from "./TodoItem";

export function TodoList(){
    return (
        <div className="mr-auto ml-auto mt-16 w-[736px]">
            <div className="flex justify-between mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#4EA8DE]">Tarefas criadas</span>
                    <span className="text-xs font-bold text-gray-200"><div className="bg-gray-400 rounded-full px-2">0</div></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#8284FA]">Concluidas</span>
                    <span className="text-xs font-bold text-gray-200"><div className="bg-gray-400 rounded-full px-[10px]">0 de 0</div></span>
                </div>
            </div>

            <div>
                <TodoItem/>
            </div>
        </div>
    )
}