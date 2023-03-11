import { configureStore, createSlice } from "@reduxjs/toolkit";

//const initialTodos = [];
const initialTodos = {
  todos: [],
  closedTodos: []
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoFind = state.find((todo) => todo.todoId === action.payload);
      if (todoFind) {
        state.splice(state.indexOf(todoFind), 1);
      }
    },
    editTodo: (state, action) => {
      const todoFind = state.find((todo) => todo.todoId === action.payload);
      if (todoFind) {
        state.splice(state.indexOf(todoFind), 1);
      }
    },
    setTodos: (state, action) => {
      const todos = action.payload;
      if (Array.isArray(todos)) {
        // Verificar que cada objeto tenga las propiedades necesarias
        const hasAllProps = todos.every(
          (todo) =>
            todo.hasOwnProperty("id") &&
            todo.hasOwnProperty("label") &&
            todo.hasOwnProperty("checked")
        );
    
        if (hasAllProps) {
          const updatedTodos = todos.map((todo) => ({
            ...todo,
            closed: false
          }));
          state.todos.push(...updatedTodos);
        } else {
          console.error("Error: Invalid payload received in setTodos().");
        }
      } else {
        console.error("Error: Invalid payload received in setTodos().");
      }
    },
    closeTodoAction: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.closed = true;
        state.closedTodos.push(todo);
        state.todos.splice(state.todos.indexOf(todo), 1);
      }
    }
               
  },
});

export const { addTodo, deleteTodo, editTodo, setTodos, closeTodoAction  } = todosSlice.actions;

export const store = configureStore({
  reducer: todosSlice.reducer,
});
