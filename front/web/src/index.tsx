import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import "typeface-roboto";
import store from "./store";
import theme from "./theme";
import App from "./App";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: "jss-insertion-point"
});

const HotModule = hot(module)(() => (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseLine />
        <App />
      </MuiThemeProvider>
    </JssProvider>
  </Provider>
));

ReactDOM.render(<HotModule />, window.document.getElementById("app"));
