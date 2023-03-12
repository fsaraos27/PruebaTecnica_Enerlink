import { useState } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../Features/Todo/TodoSlice";
import { useTodos } from "hooks/useTodos";
import { v4 as uuidv4 } from "uuid";//Para generar ID unicos a las tareas creadas
import "./TodoForm.css";

export function TodoForm() {
  const [todo, setTodo] = useState({label: "", checked: false,});//Se define el estado inicial de "todo" con 2 propiedades.
  const dispatch = useDispatch();
  const { addTodos } = useTodos();//instancia del hook useTodos que se comunica con la API

  const handleChange = (data) => {//Se actualiza el componente en base a lo que ingresa el usuario en el formulario
    setTodo({...todo, [data.target.name]: data.target.value,});
  };

  
  
  /*
    handleSubmit envía la información ingresada por el usuario, guardando los datos en una constante que 
    se utiliza en los hook que se comunican con la API y en la función que actualiza el objeto.
  */
  const handleSubmit = async (data) => {
    data.preventDefault();
    const nuevoTodo = {...todo, todoId: uuidv4(),
    };
    await addTodos(nuevoTodo);
    dispatch(addTodo(nuevoTodo));
    setTodo({
      todoId: "",
      label: "",
      checked: false,
    });
    console.log(nuevoTodo);
  };
  
  
  //Si "label" es vacío en este caso el input, el botón queda inhabilitado
  const sinTexto = todo.label.trim() === "";

  return (
    <div>
      <div className="content">
        <Form onSubmit={handleSubmit}>
          <TextArea style={{ 
                      textDecoration: "none",
                      boxShadow: "7px 5px 5px rgba(17, 1, 1, 0.4",
                      marginTop: 20
                    }} className="enter"
            name="label"
            focus={true}
            placeholder="Escribir tarea"
            onChange={handleChange}
          />
          <div style={{ 
                        marginTop: 20,
                    }}>
          <Button style={{ 
                      textDecoration: "none",
                      boxShadow: "7px 5px 5px rgba(17, 1, 1, 0.4)"
                    }} className="crear"
              type="submit"
              content="Crear tarea"
              disabled={sinTexto}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
