# React TODO app con Redux

1. Por alguna razón el proyecto se sube a GIT sin la dependencia de yarn, imagino que debe ser por el gitignore, por lo que hay que instalar "yarn install" para correr el proyecto.

2. Para la edición de las tareas, se puede verificar el cambio de estado instalando una extensión de redux en Chrome, aquí hay 2 imágenes
image.png
image.png

3. Al crear tareas no se muestran en la vista ya que está consultando la APi todo el tiempo, pero si se muestra un mensaje "toast" en la función del hook después de la respuesta, así me aseguro que la conexión es exitosa, de lo contrario el mensaje es "Error en la llamada"

4. Agregué un diseño personalizado y 2 botones para manipular la lista "mostrar Tareas" "Limpiar Vista"

5. No logré contar las tareas marcadas desde TodoResult, pero si logré mostrarlas desde TodoList.

