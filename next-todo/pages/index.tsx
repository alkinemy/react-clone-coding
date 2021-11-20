import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todos";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";


const index: NextPage = () => {
    return <TodoList todos={[]}/>;
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store =>
    async () => {
        try {
            const {data} = await getTodosAPI();
            store.dispatch(todoActions.setTodo(data));
            return {
                props: {}
            };
        } catch (e) {
            console.log(e);
            return {
                props: {}
            };
        }
    }
);


export default index;