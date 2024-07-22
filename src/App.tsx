import React from "react";
import logo from "./logo.svg";
import "./App.css";
import XOGame from "./components/xo-game";
import { Stack } from "@mui/material";

function App() {
    return (
        <Stack direction={"column"} alignItems={"center"}>
            <XOGame />
        </Stack>
    );
}

export default App;
