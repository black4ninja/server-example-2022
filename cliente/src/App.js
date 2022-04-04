import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import Create from "./components/create";
import Navbar from "./components/navbar";
import RecordList from './components/recordList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
