import { BASE_API } from "../utils/constants";

//Obtengo todas las tareas desde la api
export async function getTodosApi(){
    try {
        const url = `${BASE_API}/todos/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

//Obtengo una tarea pendiente desde la api por ID
export async function getIdTareaApi(id) {
    try {
      const url = `${BASE_API}/todos/${id}`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }