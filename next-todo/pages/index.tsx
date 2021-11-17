import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todos";


interface IProps {
    todos: TodoType[];
}


const index: NextPage<IProps> = ({ todos }) => {
    return <TodoList todos={todos}/>;
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await getTodosAPI();
        return {
            props: {
                 todos: data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                todos: []
            }
        }
    }
}


export default index;