import React from "react";
import { Input } from "./components/Input";
import { GlobalProvider } from "./context/GlobalState";
import Board from "./components/Board";

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <h1>Todos</h1>
                <br />
                <Input placeholder="What needs to be done?" />
                <Board/>
            </div>
        </GlobalProvider>
    );
}

export default App;
