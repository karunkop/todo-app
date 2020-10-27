import React, { useState, useRef, useEffect } from "react";

const Todos = ({ setHandleChange, setHandleRemove, setHandleClick, hover, setHover, id, title, completed }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(title);

    const myRef = useRef();
    const inputRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setValue(title);
            setEdit(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    const handleOnMouseEnter = () => {
        setHover(id);
    };

    const handleOnClick = () => {
        setHandleClick(id, title);
    };

    const handleRemove = () => {
        setHandleRemove(id);
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleOnChange = e => {
        setValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            if (value === "") return;
            setHandleChange(id, e.target.value, completed);
            setEdit(false);
        }
    };

    return (
        <div ref={myRef} onDoubleClick={handleEdit} onMouseEnter={handleOnMouseEnter} onMouseLeave={() => setHover(null)} className="todos-container">
            {!edit && <span onClick={handleOnClick}> {completed ? <i id="tick" className="fas fa-check-circle" /> : <i className="fas fa-list"></i>} </span>}
            {!edit && <span style={{ opacity: completed ? "0.6" : "1", textDecoration: completed ? "line-through" : "none" }}> {title}</span>}

            {hover && !edit && (
                <span id="cross" onClick={handleRemove}>
                    &times;
                </span>
            )}

            {edit && <input ref={inputRef} onKeyDown={handleKeyDown} value={value} onChange={handleOnChange} autoFocus id="edit-input" type="text" />}
        </div>
    );
};

export default Todos;
