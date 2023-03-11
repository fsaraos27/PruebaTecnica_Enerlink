import "./styles.css";
import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react"; //Importamos la libreria semantic
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, setTodos, closeTodoAction } from "../../Features/Todo/TodoSlice";
import { TodoForm } from "../../components/TodoForm/TodoForm";
import { useTodos } from "hooks/useTodos";
import { toast } from "react-hot-toast";
import Checkbox from "semantic-ui-react/dist/commonjs/modules/Checkbox";

const TodoList = () => {
  const stateTodos = useSelector(state => state.todos);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titleModal, setTitleModal] = useState(null);
  const { getTodos } = useTodos();
  const [apiTodos, setApiTodos] = useState([]);

  useEffect(() => {
    getNotesApi();
  }, []);

  const getNotesApi = async () => {
    try {
      const data = await getTodos();
      console.log(data);
      setApiTodos(data);
      dispatch(setTodos(data));
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch();

  const handleDelete = (todoId) => {
    const todo = apiTodos.find((todo) => todo.id === todoId);
    if (todo.checked) {
      dispatch(deleteTodo(todoId));
      setApiTodos(apiTodos.filter((todo) => todo.id !== todoId));
    }else{
      toast("Para Eliminar la tarea, primero activa el Check para tacharla");
    }
  };

  const handleCheck = (todoId) => {
    const updatedTodos = apiTodos.map((todo) =>
      todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
    );
    setApiTodos(updatedTodos);
  };

  const handleClose = (todoId) => {
    const todo = apiTodos.find((todo) => todo.id === todoId);
    if (todo.checked) {
      const updatedTodos = apiTodos.filter((todo) => todo.id !== todoId);
      setApiTodos(updatedTodos);
      console.log(updatedTodos);
      dispatch(closeTodoAction(todo));
    }else{
      toast("Para Cerrar la tarea, primero activa el Check para tacharla");
    }
  };
  

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <TodoForm />
      <div className="todo-list-content">
        <div>
          {/* Si hay tareas en el estado apiTodos, mostrarlas */}
          {apiTodos &&
              apiTodos.length > 0 &&
              apiTodos.map((todo) => (
                  <div
                    key={todo.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "40px 0",
                      borderRadius: "10px",
                      border: "1px solid blue",
                      padding: "40px",
                      width: "830px",
                      textDecoration: todo.checked ? "line-through" : "none"
                    }}
                  >
                    <Checkbox
                      style={{ marginRight: "40px" }}
                      checked={todo.checked}
                      onChange={() => handleCheck(todo.id)}
                    />
                    <div style={{ marginRight: "40px" }}>
                      <p>{todo.label}</p>
                    </div>
                    <div>
                      <Button style={{ textDecoration: "none" }} onClick={() => handleClose(todo.id)}>Cerrar</Button>
                      <p></p>
                      <Button style={{ textDecoration: "none" }} onClick={() => handleDelete(todo.id)}>Eliminar</Button>
                    </div>
                  </div>
              ))}
          <Button onClick={() => getNotesApi()}>Obtener Tareas</Button>
          <p></p>
          <Button onClick={() => setApiTodos([])}>Limpiar Lista</Button>
        </div>
      </div>
      {apiTodos && apiTodos.length > 0 ? (
          <div className="no-todos">You have pending tasks</div>
        ) : (
          <div className="no-todos">Looks like you&apos;re absolutely free today!</div>
        )}
    </div>
  );
}
export default TodoList;