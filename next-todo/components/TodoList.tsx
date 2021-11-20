import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { TodoType } from "../types/todo";
import palette from "../styles/palette";
import TrashCanIcon from "../public/statics/svg/trash_can.svg";
import CheckMarkIcon from "../public/statics/svg/check_mark.svg";
import { checkTodoAPI, deleteTodoAPI } from "../lib/api/todos";
import { useSelector } from "../store";
import { todoActions } from "../store/todo";
import { useDispatch } from "react-redux";

const Container = styled.div`
    width: 100%;
    .todo-num {
        margin-left: 12px;
    }
    .todo-list-header {
        padding: 12px;
        position: relative;
        border-bottom: 1px solid ${palette.gray};
        .todo-list-last-todo {
            font-size: 14px;
            margin: 0 0 8px;
            span {
                margin-left: 12px;
            }
        }
        .todo-list-header-colors {
            display: flex;
            .todo-list-header-color-num {
                display: flex;
                margin-right: 8px;
                p {
                    font-size: 14px;
                    line-height: 16px;
                    margin: 0;
                    margin-left: 6px;
                }
                .todo-list-header-round-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
            }
        }
    }
    .bg-blue {
        background-color: ${palette.blue};
    }
    .bg-green {
        background-color: ${palette.green};
    }
    .bg-navy {
        background-color: ${palette.navy};
    }
    .bg-orange {
        background-color: ${palette.orange};
    }
    .bg-red {
        background-color: ${palette.red};
    }
    .bg-yellow {
        background-color: ${palette.yellow};
    }
    .todo-list {
        .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 52px;
            border-bottom: 1px solid ${palette.gray};
            .todo-left-side {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                .todo-color-block {
                    width: 12px;
                    height: 100%;
                }
                .checked-todo-text {
                    color: ${palette.gray};
                    text-decoration: line-through;
                }
                .todo-text {
                    margin-left: 12px;
                    font-size: 16px;
                }
            }
        }
    }
    .todo-right-side {
        display: flex;
        margin-right: 12px;
        svg {
            &:first-child {
                margin-right: 16px;
            }
        }
        .todo-trash-can {
            width: 25px;
            path {
                fill: ${palette.deep_red};
            }
        }
        .todo-check-mark {
            fill: ${palette.deep_green};
        }
        .todo-button {
            width: 20px;
            height: 20px;
            border-radius: 50px;
            border: 1px solid ${palette.gray};
            background-color transparent;
            outline: none;
        }
    }
`

interface IProps {
    todos: TodoType[];
}


const TodoList: React.FC<IProps> = () => {
    const todos = useSelector((state) => state.todo.todos)
    const dispatch = useDispatch();
    type ObjectIndexType = {
        [key: string]: number | undefined;
    }
    const todoColorNums = useMemo(() => {
        const colors: ObjectIndexType = {};
        todos.forEach((todo) => {
            const value = colors[todo.color];
            if (!value) {
                colors[`${todo.color}`] = 1;
            } else {
                colors[`${todo.color}`] = value + 1;
            }
        });
        return colors;
    }, [todos]);

    const checkTodo = async (id: number) => {
        try {
            await checkTodoAPI(id);
            console.log("체크하였습니다.");
            const newTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, checked: !todo.checked };
                }
                return todo;
            });
            dispatch(todoActions.setTodo(newTodos))
        } catch (e) {
            console.log(e);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoAPI(id);
            const newTodos = todos.filter((todo) => todo.id !== id);
            dispatch(todoActions.setTodo(newTodos));
            console.log("삭제했습니다.");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <div className="todo-list-header">
                <p className="todo-list-last-todo">
                    남은 TODO<span>{todos.length}개</span>
                </p>
                <div className="todo-list-header-colors">
                    {Object.keys(todoColorNums).map((color, index) => (
                        <div className="todo-list-header-color-num" key={index}>
                            <div className={`todo-list-header-round-color bg-${color}`}/>
                            <p>{todoColorNums[color]}개</p>
                        </div>
                    ))}
                </div>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        <div className="todo-left-side">
                            <div className={`todo-color-block bg-${todo.color}`} />
                            <p className={`todo-text ${todo.checked ? "checked-todo-text" : ""}`}>
                                {todo.text}
                            </p>
                        </div>
                        <div className="todo-right-side">
                            {todo.checked && (
                                <>
                                    <TrashCanIcon className="todo-trash-can" onClick={async () => { await deleteTodo(todo.id)}}/>
                                    <CheckMarkIcon className="todo-check-mark" onClick={async () => { await checkTodo(todo.id) }}/>
                                </>
                            )}
                            {!todo.checked && (
                                <button type="button" className="todo-button" onClick={async () => { await checkTodo(todo.id) }}/>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};


export default TodoList;