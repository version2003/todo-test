'use client'

import { Checkbox } from "@/components/ui/checkbox"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Todos from "./todos"

export default function TodoList(){
    
    const todos = useQuery(api.todo.get)
    if(!todos) return null
    
    return(
        <div className=" xl:px-40" >
            <div className="flex items-center justify-between" >
                <h1 className="text-2xl font-bold" >Todo List</h1>
            </div>

            <div className=" flex flex-col gap-4 py-4" >
                <Todos items={todos} />
            </div>
        </div>
    )
}


