import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Update from "./Components/Update";
import ShowData from "./Components/ShowData";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer limit={1} position="top-right" />
      <div className="min-height d-flex flex-column">
        <header className="mx-auto">
          <Link to="/">
            <Button className="my-5 text-center me-2" variant="info">Add</Button>
          </Link>
          <Link to="/showdata">
            <Button className="my-5 text-center" variant="dark">Todo</Button>
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/showdata" element={<ShowData />} />
          </Routes>
        </main>
        <footer>
          <p className="my-2 text-center">Abdul Aziz &copy; 2023</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
