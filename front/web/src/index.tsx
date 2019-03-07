import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import App from "./App";

const HotModule = hot(module)(() => <App />);

ReactDOM.render(<HotModule />, window.document.getElementById("app"));
