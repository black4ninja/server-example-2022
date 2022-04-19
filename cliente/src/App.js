import './App.css';
import { Route, Routes } from "react-router-dom";

import Create from "./components/create";
import Navbar from "./components/navbar";
import RecordList from './components/recordList';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
