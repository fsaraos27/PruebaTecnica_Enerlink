import { useState } from "react";
import { 
  getTodosApi, 
  addTablesApi, 
  updateTableApi, 
  deleteTableApi,} from "../api/todos";

export function useTodos(){
    const [todos, setTodos] = useState(null);
    const [todo, setTodo] = useState(null);


    const getTodos = async () => {
      const response = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/");
      const data = await response.json();
      //console.log(data);
      return data;
    };

    
const addTodos = async (todo) => {
  try {
    const params = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const response = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos", params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}



    /*
    //Obtiene todas las mesas de la base de datos
    const getTodos = async () => {
        try {
            const response = await getTodosApi();
            setTodos(response);
            //console.log(response);
        } catch (error) {
          throw(error)
        }
    };
    */


    /*
    const addTables = async (data) => {
      try {
          setLoading(true);
          await addTablesApi({...data }, auth.token);
          setLoading(false);
      } catch (error) {
          setLoading(false);
          setError(error);
      }
  };
  
  const updateTable = async (id, data) => {
    try {
        setLoading(true);
        await updateTableApi(id, { ...data }, auth.token);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        setError(error);
    }
};

    
    const deleteTables = async (id) => {
        try {
            setLoading(true);
            await deleteTableApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }
    */


    return{
        todos,
        todo,
        getTodos,
        addTodos,
        //addTables,
        //updateTable,
        //deleteTables,
    };

}