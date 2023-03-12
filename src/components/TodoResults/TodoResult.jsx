import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTodos } from "hooks/useTodos";
import { setTodos, closeTodoAction } from "../../Features/Todo/TodoSlice";
import "./styles.css";

function TodoResult() {
  const [closedTodosCount, setClosedTodosCount] = useState(0);
  const { getTodos } = useTodos();
  const dispatch = useDispatch();

  const closedTodos = useSelector(closeTodoAction);

  useEffect(() => {
    setClosedTodosCount(closedTodos.length);
    console.log("Closed Todos:", closedTodos);//Obtengo las tareas cerradas, pero no logro mostrar el contador
  }, [closedTodos]);

  return (
    <div className="todo-results">
      <h3>Closed Notes: {closedTodosCount}</h3>
    </div>
  );
}

export default TodoResult;
