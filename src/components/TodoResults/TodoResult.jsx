import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTodos } from "hooks/useTodos";
import { setTodos, closeTodoAction } from "../../Features/Todo/TodoSlice";
import "./styles.css";

function TodoResult () {
  const [apiTodos, setApiTodos] = useState([]);
  const [apiTodosClose, setApiTodoClose] = useState([]);
  const [closedTodosCount, setClosedTodosCount] = useState(0);
  const [activeTodosCount, setActiveTodosCount] = useState(0);
  const { getTodos } = useTodos();
  const dispatch = useDispatch();

  useEffect(() => {
    getNotesApi();
  }, []);

  useEffect(() => {
    getNotesClose();
  }, []);

  useEffect(() => {
    setActiveTodosCount(apiTodos.filter(todo => !todo.completed).length);
  }, [apiTodos]);

  const getNotesApi = async () => {
    try {
      const data = await getTodos();
      setApiTodos(data);
      dispatch(setTodos(data));
    } catch (error) {
      console.error(error);
    }
  };

  const getNotesClose = async () => {
    try {
      const data = await getTodos();
      setApiTodoClose(data);
      dispatch(closeTodoAction(data));
      setClosedTodosCount(data.filter(todo => todo.completed).length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="todo-results">
        {apiTodos && (
          <>
            <h3>Active Notes: {activeTodosCount}</h3>
          </>
        )}
      </div>
  )
};

export default TodoResult;
