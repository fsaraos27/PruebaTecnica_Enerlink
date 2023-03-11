import { BASE_API } from "../utils/constants";

//Obtiene todas las mesas de la base de datos
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

/*
export async function addTablesApi(data, token){
    try {
        const url = `${BASE_API}/api/tables/`;
        const params = {
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function updateTableApi(id, data, token){
    try {
        const url = `${BASE_API}/api/tables/${id}/`;
        const params = {
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteTableApi(id, token){
    try {
    
        const url = `${BASE_API}/api/tables/${id}/`;
        const params = {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
*/