import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "../../types/todo";


const getList = () => {
    const todosBuffer = readFileSync("data/todos.json");
    const todosString = todosBuffer.toString();
    if (!todosString) {
        return [];
    }
    const todos: TodoType[] = JSON.parse(todosString);
    return todos;
}

const exist = ({ id }: { id: number}) => {
    const todos = getList();
    return todos.some((todo) => todo.id === id);
}

const write = async (todos: TodoType[]) => {
    writeFileSync("data/todos.json", JSON.stringify(todos));
}

export default { getList, exist, write };