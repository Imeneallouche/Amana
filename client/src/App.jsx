import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import HomePage  from './pages/Volunteer/Home';
import AchievedTransactions from './pages/Volunteer/AchievedTransaction';
import InProgressTransactions from './pages/Volunteer/InProgressTransaction';
function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
   
      <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/homeVolunteer" element={<HomePage />} />
          <Route path="/transactionsVolunteerCompleted" element={<AchievedTransactions />} />
          <Route path="/transactionsVolunteerInProgress" element={<InProgressTransactions />} />

        </Routes>
    </div>
  );
}

export default App;


