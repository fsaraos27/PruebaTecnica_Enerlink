import { BASE_API } from "../utils/constants";

//Obtengo todas las tareas desde la api
export async function getTodosApi(){
    try {
        const url = `${BASE_API}/todos/`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
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
      const respuesta = await fetch(url, params);
      const resultado = await respuesta.json();
      return resultado;
    } catch (error) {
      throw error;
    }
  }