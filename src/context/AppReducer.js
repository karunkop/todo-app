export default (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case "UPDATE_TODO":
            let selectedTodo = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...action.payload };
                } else {
                    return { ...todo };
                }
            });
            return {
                ...state,
                todos: selectedTodo,
            };
        case "DELETE_TODO":
            let newTodos = state.todos.filter(todo => todo.id !== action.payload);
            return {
                ...state,
                todos: newTodos,
            };
        case "CLEAR_ALL_COMPLETED":
            return {
                ...state,
                todos : action.payload
            }
        default:
            return state;
    }
};
