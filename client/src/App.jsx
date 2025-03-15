import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import HomePage  from './pages/Volunteer/Home';
import Transactions from './pages/Volunteer/Transaction';
function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
   
      <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/homeVolunteer" element={<HomePage />} />
          <Route path="/transactionsVolunteer" element={<Transactions />} />
  
        </Routes>
    </div>
  );
}

export default App;


