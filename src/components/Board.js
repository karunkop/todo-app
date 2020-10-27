import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Todos from "./Todos";

const Board = () => {
    const { todos, updateTodo, deleteTodo, clearCompletedTodo } = useContext(GlobalContext);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [allTodos, setAllTodos] = useState([]);

    const [clear, setClear] = useState(false);

    const [actualItems, setActualItems] = useState(null);

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        setAllTodos(todos);

        if (todos.length) {
            let status = todos.some(todo => todo.completed === true);
            setClear(status);

            let completedTodos = todos.filter(todo => todo.completed);
            setActualItems(todos.length - completedTodos.length);

            if (isCompleted) {
                let completedTodos = todos.filter(todo => todo.completed);
                setAllTodos(completedTodos);
            }
        }
    }, [todos, isCompleted]);

    const handleHover = id => {
        setSelectedTodo(id);
    };

    const handleActive = () => {
        let activeTodos = todos.filter(todo => !todo.completed);
        setAllTodos(activeTodos);
        setIsCompleted(false);
    };

    const handleAll = () => {
        setAllTodos(todos);
        setIsCompleted(false);
    };

    const handleCompleted = () => {
        let completedTodos = todos.filter(todo => todo.completed);
        setIsCompleted(true);
        setAllTodos(completedTodos);
    };

    const handleClick = (id, title) => {
        setSelectedTodo(id);

        updateTodo({
            id,
            title,
            completed: !allTodos.find(todo => todo.id === id).completed,
        });
    };

    const handleRemove = id => {
        deleteTodo(id);
    };

    const handleClearCompleted = () => {
        let newTodos = [...todos];
        let filteredTodos = newTodos.filter(todo => !todo.completed);
        clearCompletedTodo(filteredTodos);
    };

    const handleEdit = (id, title, completed) => {
        updateTodo({
            id,
            title,
            completed,
        });
    };
    return (
        <div style={{ padding: todos.length ? "1.2rem" : "0" }} className="board-container">
            {todos.length
                ? allTodos.map(todo => (
                      <Todos
                          setHover={handleHover}
                          hover={todo.id === selectedTodo ? true : false}
                          id={todo.id}
                          key={todo.id}
                          title={todo.title}
                          completed={todo.completed}
                          setHandleClick={handleClick}
                          setHandleRemove={handleRemove}
                          setHandleChange={handleEdit}
                      />
                  ))
                : null}

            {todos.length > 0 && (
                <div className="status-container">
                    <span className="items">
                        {actualItems} {actualItems > 1 ? "items" : "item"} left
                    </span>
                    <div className="filters">
                        <span id="all" onClick={handleAll}>
                            All
                        </span>
                        <span id="active" onClick={handleActive}>
                            Active
                        </span>
                        <span id="completed" onClick={handleCompleted}>
                            Completed
                        </span>
                    </div>
                    {clear && (
                        <span className="clear" onClick={handleClearCompleted}>
                            Clear Completed
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Board;
