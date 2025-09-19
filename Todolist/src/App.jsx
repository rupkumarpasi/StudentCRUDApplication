import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Create from './component/create'
import Read from './component/Read'
import Update from './component/update'
import Delete from './component/Delete'

function App() {
 

  return (
    <>
    <h1>Student Crud application</h1>

          <nav>
        <Link to="/">ReadData</Link> |{" "}
        <Link to="/create">Create</Link> |{" "}
        <Link to="/update">Update</Link> |{" "}
        <Link to="/delete">Delete</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
         <Route path="/delete" element={<Delete />} />
      </Routes>

    </>
  )
}

export default App
