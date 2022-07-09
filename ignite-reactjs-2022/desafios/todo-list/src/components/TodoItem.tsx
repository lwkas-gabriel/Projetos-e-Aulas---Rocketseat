import { Trash } from "phosphor-react";

export function TodoItem(){
    return (
        <div className="flex bg-gray-500 border-gray-400 px-4 py-4 gap-3 rounded-lg">
            <input className="w-6 h-6 rounded-full text-purple-600 ring-offset-0 border-none" type="checkbox" />
            <p className="text-sm text-gray-100">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae explicabo corrupti perspiciatis harum unde minima similique totam officiis atque officia!
            </p>
            <button type="button"><Trash color="#808080" size={24} /></button>
            
        </div>
    )
}