import './App.css';
import './styles/style.scss';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
