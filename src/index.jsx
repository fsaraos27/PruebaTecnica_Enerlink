import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux"; //importamos el provider para englobar nuestro componente principal App
import { store } from "../src/Features/Todo/TodoSlice"; //Importamos el store para las consultas y se lo pasamos al provider
 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
