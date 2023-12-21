import Form from "./screen/Main";
import "./sass/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <h1>LOGBOOK</h1>
      <Form />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
