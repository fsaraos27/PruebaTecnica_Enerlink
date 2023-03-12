import TodoList from "./components/TodoList/TodoList";
import TodoResult from "./components/TodoResults/TodoResult";
import { Toaster } from 'react-hot-toast';
import "./App.css";

const App = () => {


  return (
    <div className="root">
      <TodoList />
      <Toaster  
        position='top-right'
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        className="toast-custom"
      />
      <TodoResult />
    </div>
  );
};

export default App;
