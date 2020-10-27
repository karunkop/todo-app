import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//Initial State

const initialState = {
    todos: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addTodo(todo) {
        dispatch({
            type: "ADD_TODO",
            payload: todo,
        });
    }

    function updateTodo(todo) {
        dispatch({
            type: "UPDATE_TODO",
            payload: todo,
        });
    }

    function deleteTodo(id) {
        dispatch({
            type: "DELETE_TODO",
            payload: id,
        });
    }

    function clearCompletedTodo(todos) {
        dispatch({
            type: "CLEAR_ALL_COMPLETED",
            payload: todos,
        });
    }

    return <GlobalContext.Provider value={{ todos: state.todos, addTodo, updateTodo, deleteTodo, clearCompletedTodo }}>{children}</GlobalContext.Provider>;
};
