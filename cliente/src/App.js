import './App.css';
import { Route, Routes } from "react-router-dom";

import Create from "@pages/Records/RecordCreate";
import Navbar from "@components/navbar";
import RecordList from '@pages/Records/Record';
import Profile from '@pages/Profile/Profile';
import TodoPage from './pages/Todos/Todo';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/todos" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
