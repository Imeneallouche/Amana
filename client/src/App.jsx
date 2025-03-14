import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import SideBar from './components/SideBar';
import ONGCard from './components/ONGCard';
function App() {
  return (
    <div className="font-lora flex bg-[#F9F9F9] flex-col relative w-screen">
     <ONGCard/>
    {
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
      }
    </div>
  );
}

export default App;