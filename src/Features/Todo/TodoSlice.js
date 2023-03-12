//Aquí se encuentra el Redux store utilizando Toolkit
import { configureStore, createSlice } from "@reduxjs/toolkit";

//Se inicializa el estado con 2 arrays
const initialTodos = {
  todos: [],
  closedTodos: []
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {//Aquí se encuentran las acciones que actualizan los estados de los componentes.

    addTodo: (state, action) => {//Agrega una tarea con el label y checked, el ID se obtiene en el Form
      const { label, checked } = action.payload;
      state.todos.push({ label, checked });
    },    

    deleteTodo: (state, action) => {//Elimina la tarea comparando el ID del state con el que está en payload en base al index de búsqueda
      const todoFind = state.todos.find((todo) => todo.todoId === action.payload);
      if (todoFind) {
        const index = state.todos.indexOf(todoFind);
        state.todos[index] = {
          ...todoFind,
          checked: !todoFind.checked
        };
      }
      console.log(state.todos);
    },

    editTodo: (state, action) => {//Edita la tarea clonando el objeto encontrado en el indice para cambiar el estado checked
      const todoFind = state.todos.find((todo) => todo.todoId === action.payload);
      if (todoFind) {
        const index = state.todos.indexOf(todoFind);
        state.todos[index] = {
          ...todoFind,
          checked: !todoFind.checked
        };
      }
      console.log(state.todos);
    },    

    setTodos: (state, action) => {
      const todos = action.payload;
      if (Array.isArray(todos)) {//Verifico que el objeto sea un array
        
        const hasAllProps = todos.every(
          (todo) =>// Verifico que cada objeto tenga las propiedades necesarias
            todo.hasOwnProperty("id") &&
            todo.hasOwnProperty("label") &&
            todo.hasOwnProperty("checked")
        );
    
        if (hasAllProps) {//Crea una copia de la matriz para agregar la propiedad closed: false - para utilizar en el acción "closeTodoAction"
          const updatedTodos = todos.map((todo) => ({
            ...todo,
            closed: false
          }));
          state.todos.push(...updatedTodos);//Se agregan a la matriz
        } else {
          console.error("Error: Invalid payload received in setTodos().");
        }
      } else {
        console.error("Error: Invalid payload received in setTodos().");
      }
    },
    
    //Elimina una tarea de la vista guardandola en un estado cerrado
    closeTodoAction: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);//Busca la tarea en base a su ID
      if (todo) {
        todo.closed = true;
        state.closedTodos.push(todo);//Se agrega la tarea cerrada a closeTodos
        state.todos.splice(state.todos.indexOf(todo), 1);
      }
    }
               
  },
});

//Se exportan las acciones
export const { addTodo, deleteTodo, editTodo, setTodos, closeTodoAction  } = todosSlice.actions;

export const store = configureStore({
  reducer: todosSlice.reducer,
});
