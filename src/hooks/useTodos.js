import { useState } from "react";
import { toast } from "react-hot-toast";
import { getIdTareaApi } from "../../src/api/todos";

//Hooks utilizados dentro de la aplicación para la comunicación con la API.

export function useTodos(){
    const [todos, setTodos] = useState(null);
    const [todo, setTodo] = useState(null);


//Obtiene todas las tareas que se encuentran en la APi
const getTodos = async () => {
  const respuesta = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/");
  const data = await respuesta.json();
  return data;
};


//Permite agregar las tareas a la API
const addTodos = async (todo) => {
  try {
    const params = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const respuesta = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos", params);
    const resultado = await respuesta.json();
    toast("Tarea agregada con Éxito");
    return resultado;
  } catch (error) {
    toast("Ocurrió un error en la llamada");
    throw error;
  }
}

//permite editar las tareas de la API
const updateTodo = async (todo) => {
  try {
    const todoId = await getIdTareaApi(todo);

    if (!todoId) {
      console.log("No se encontró la tarea en la API");
      return;
    }
    
    const params = {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const respuesta = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, params);
    const resultado = await respuesta.json();
    toast("Tarea editada con Éxito");
    return resultado;
  } catch (error) {
    toast("Ocurrió un error en la llamada");
    throw error;
  }
};



//Permite eliminar una tarea de la API
const deleteTarea = async (todo) => {
  try {
    const todoId = await getIdTareaApi(todo);//Se obtiene la tarea desde la APi

    if (!todoId) {
      console.log("No se encontró la tarea en la API");
      return;
    }
    
    const params = {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      // Modifica el cuerpo para solo incluir el ID de la tarea
      body: JSON.stringify({ id: todoId }),
    };
    const respuesta = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, params);
    const resultado = await respuesta.json();
    toast("Tarea eliminada con Éxito");
    return resultado;
  } catch (error) {
    toast("Ocurrió un error en la llamada");
    throw error;
  }
};


    return{//Se retornan las funciones para llamarlas en los componentes
        todos,
        todo,
        getTodos,
        addTodos,
        updateTodo,
        deleteTarea,
    };

}