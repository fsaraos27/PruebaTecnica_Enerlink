import React, { useState } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../Features/Todo/TodoSlice";
import { useTodos } from "hooks/useTodos";
import { v4 as uuidv4 } from "uuid";

export function TodoForm() {
  const [todo, setTodo] = useState({
    todoId: "",
    label: "",
    checked: false,
  });
  const dispatch = useDispatch();
  const { addTodos } = useTodos();

  const handleChange = (data) => {
    setTodo({
      ...todo,
      [data.target.name]: data.target.value,
    });
  };

  const handleSubmit = async (data) => {
    data.preventDefault();
    const newTodo = {
      ...todo,
      todoId: uuidv4(),
    };
    await addTodos(newTodo);
    dispatch(addTodo(newTodo));
    setTodo({
      todoId: "",
      label: "",
      checked: false,
    });
  };

  const isLabelEmpty = todo.label.trim() === "";

  return (
    <div className="todo-list">
      <div className="todo-list-formulario">
        <Form onSubmit={handleSubmit}>
          <TextArea
            name="label"
            placeholder="Descripción del TODO"
            onChange={handleChange}
          />
          <div className="todo-list-formularioBoton">
            <Button
              type="submit"
              content="Crear un TODO"
              disabled={isLabelEmpty} // Agregar la condición aquí
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
