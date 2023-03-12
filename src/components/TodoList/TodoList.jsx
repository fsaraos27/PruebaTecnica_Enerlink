import "./TodoList.css";
import { useState, useEffect } from "react";
import { Button, Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodos, closeTodoAction, editTodo } from "../../Features/Todo/TodoSlice";//Se importan las "Acciones" desde el Slice "Store"
import { TodoForm } from "../../components/TodoForm/TodoForm";
import { useTodos } from "hooks/useTodos";//Se importa el Hook para acceder a la API si es necesario.
import { toast } from "react-hot-toast";

const TodoList = () => {
  const { getTodos, updateTodo, deleteTarea } = useTodos();
  const [closedTodosCount, setClosedTodosCount] = useState(0);
  const [apiTodos, setApiTodos] = useState([]);//Se inicializa un estado array para manejar las tareas desde el Store.
  const dispatch = useDispatch();

  const closedTodos = useSelector(closeTodoAction);


  useEffect(() => {
    setClosedTodosCount(apiTodos.filter(todo => todo.checked).length);//Cuento la cantidad de elemntos que tienen el "checked" en true
  }, [apiTodos]);


  useEffect(() => {//Se ejecuta la funcion getNoteApi para mostrar las tareas de la Api en cuanto carga la página.
    getNotesApi();
  }, []);



  //Permite traer las tareas desde la API utilizando la función "getTodos" desde el hook "useTodos, finaliza con el disparador dispatch.
  const getNotesApi = async () => {
    try {
      const data = await getTodos();
      console.log(data);
      setApiTodos(data);
      dispatch(setTodos(data));
      toast("Tareas Cargadas Automáticamente");
    } catch (error) {
      console.error(error);
    }
  };



  /*
    handleDelete crea una copia de la matriz y la guarda localmente para eliminar una tarea en base a su ID, la función "await deleteTarea" 
    del hook "useTodos" espera la respuesta para hacer un llamado a la API y eliminar la tarea.
  */
    const handleDelete = async (todoId) => {
      const eliminarTodos = apiTodos.map((tarea) =>
        tarea.id === todoId ? { ...tarea } : tarea
      );
      setApiTodos(eliminarTodos);
      await deleteTarea(todoId);
      const eliminaTarea = eliminarTodos.find((tarea) => tarea.id === todoId);
      dispatch(deleteTodo({ todoId, ...eliminaTarea }));
      dispatch(closeTodoAction({ todoId, ...eliminaTarea }));
    };



    /*
    Esta función no realiza llamado a la API y la funcionalidad es similar a la función del checked, con la diferencia que quita la tarea de la vista, 
    valida que no se pueda cerrar si el check no está marcado. Se guarda en una acción especial dentro del Store llamada "closeTodoAction"
  */
    const handleClose = (todoId) => {
      const todo = apiTodos.find((todo) => todo.id === todoId);
      if (todo.checked) {
        const actualizarTarea = apiTodos.filter((todo) => todo.id !== todoId);
        setApiTodos(actualizarTarea);
        console.log(actualizarTarea);
        dispatch(closeTodoAction(todo));
      } else {
        toast("Para Cerrar la tarea, primero activa el Check para tacharla");
      }
    };

  


  /*
    Para que el checkbox actualice la tarea pasando de false a true, tuve que iterar por cada tarea y guardarlas en la constante updateTodos 
    y compararlas con el "todoId", si coincide, se actualiza el checked dependiendo de si está con el checkbox activado o no.
    Seguido de la función "updatetodo" que realiza un llamado a la API con la actualización en la propiedad. Finalizando con el dispatch para actualizar el estado en la Store.
    Se aplica el "textDecoration" en las propiedades del div para tachar el texto.
  */
    const handleCheck = async (todoId, todo) => {
      const actualizarTodos = apiTodos.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      );
      setApiTodos(actualizarTodos);
      await updateTodo(todo);
      const actualizaTarea = actualizarTodos.find((todo) => todo.id === todoId);
      dispatch(editTodo({ todoId, ...actualizaTarea }));
    };
  

  return (
    <div>
      <span className="todo-list-title"> | Things to do</span>
      <Button className="mostrar" style={{ 
                      textDecoration: "none",
                      borderRadius: 25,
                      padding: 7,
                      boxShadow: "3px 2px 5px rgba(124, 204, 250, 0.4)",
                      marginRight: 30,
                      background: "green",
                      color: "white"
                    }} onClick={() => getNotesApi()}>Mostrar Tareas</Button>
      <Button style={{ 
                      textDecoration: "none",
                      borderRadius: 25, 
                      padding: 7,
                      boxShadow: "3px 2px 5px rgba(124, 204, 250, 0.4)",
                      background: "gray",
                      color: "white"
                    }} onClick={() => /*Se llama a la función para limpiar la vista */ setApiTodos([])}>Limpiar Vista</Button>
      <div className="todo-list-content">
        <div>
          {/* Muestra las tareas en el estado apiTodos */}
          {apiTodos &&
              apiTodos.length > 0 &&
              apiTodos.map((todo) => (
                  <div className="title"
                    key={todo.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "100px 0",
                      borderRadius: "44px",
                      border: "2px solid white",
                      padding: "50px",
                      width: "830px",
                      textDecoration: todo.checked ? "line-through" : "none",
                      boxShadow: "0px 0px 35px rgba(124, 204, 250, 0.4)",
                    }}
                  >
                    <Checkbox
                      style={{ marginRight: "40px" }}
                      checked={todo.checked}
                      onChange={() => handleCheck(todo.id)}
                    />
                    <div style={{ marginRight: "40px", color: "#ffffff", fontWeight: "bold" }}>
                      <p style={{fontSize: 20}}>{todo.label}</p>
                    </div>
                    <div>
                      <Button className="eliminar"
                            style={{ 
                                    textDecoration: "none",
                                    borderRadius: 5, 
                                    padding: 7,
                                    boxShadow: "1px 1px 5px rgba(124, 204, 250, 0.4)"
                                  }} onClick={() => handleClose(todo.id)}>Cerrar</Button>
                      <p></p>
                      <Button className="eliminar"
                            style={{ 
                                    textDecoration: "none", 
                                    background: "red", 
                                    borderRadius: 5, 
                                    padding: 7,
                                    color: "white",
                                    boxShadow: "1px 1px 5px rgba(124, 204, 250, 0.4)"
                                  }} onClick={() => handleDelete(todo.id)}>Eliminar</Button>
                    </div>
                  </div>
              ))}
        <TodoForm />{/*Muestro el formulario de creacion de tareas*/}
        <p></p>
        </div>
      </div>
      {apiTodos && apiTodos.length > 0 ? /*El mensaje cambia según las tareas*/ (
          <div className="no-todos">You have pending tasks</div>
        ) : (
          <div className="no-todos">Looks like you&apos;re absolutely free today!</div>
        )}

      <div className="todo-results">
        <h3>Closed Notes: {/*Muestro la cantidad de elementos con el checked en true*/} {closedTodosCount}</h3>
      </div>
    </div>
  );
}
export default TodoList;