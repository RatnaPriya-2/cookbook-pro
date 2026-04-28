import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { Suspense } from "react";

function App() {
  return (
    <>
      <div className="main-container">
        <Nav />
        <Suspense fallback={<div className="loading" />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default App;
