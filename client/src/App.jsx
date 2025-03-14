import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import SideBar from './components/SideBar';
function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
     <SideBar/>
    {
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
      }
    </div>
  );
}

export default App;