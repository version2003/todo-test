import React from "react";
import Task from "./task";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";


export default function Todos({ items }: { items: Array<Doc<"todos">> }) {

  const checkATodo = useMutation(api.todo.checkATodo);
  const unCheckATodo = useMutation(api.todo.unCheckATodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckATodo({ taskId: task._id });
      toast.success("Task uncompleted");
    } else {
      checkATodo({ taskId: task._id });
      toast.success("Task completed");
    }
  };
  return items.map((task: Doc<"todos">, idx: number) => (
    <Task
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
      
    />
  ));
}
