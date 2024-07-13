import './App.css';
import Avatar from './components/Avatar';
import MainBoard from './components/MainBoard';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainBoard />}></Route>
        <Route path="/avatar" element={<Avatar />}></Route>
      </Routes>
    </Router>
  );
}

