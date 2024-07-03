import React from "react";
import { useRoutes } from "react-router-dom";
import SearchBox from "./components/SearchBox/SearchBox";
import NavBar from "./components/NavBar/NavBar";
import { routes } from "./routes";
import './App.css'

function App() {
  const router = useRoutes(routes)
  return (
    <div>
      <div className="main-page-content">
        <NavBar />
        {/* <SearchBox /> */}
        {router}
      </div>
    </div>
  );
}

export default App;
