import React, { useState, useRef, useContext } from "react";
import { uuid } from "uuidv4";
import { GlobalContext } from "../context/GlobalState";

export const Input = ({ placeholder }) => {
    const { addTodo, todos } = useContext(GlobalContext);

    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    const handleTextChange = e => {
        setValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            if (value === "") return;
            addTodo({
                id: uuid(),
                title: value,
                completed: false,
            });
            setValue("");
            inputRef.current.value = "";
        }
    };

    return (
        <div className="input-container">
            <input
                className={todos.length ? "input-only" : "input"}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                onChange={handleTextChange}
                placeholder={placeholder}
                // type="text"
            />
        </div>
    );
};
