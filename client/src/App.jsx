import { Outlet } from "react-router";
import "./App.css";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <div className="bg-[#edf3fc] h-screen">
      <Outlet />
    </div>
  );
}

export default App;
