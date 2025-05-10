import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import HomePage  from './pages/Volunteer/Home';
import AchievedTransactions from './pages/Volunteer/AchievedTransaction';
import InProgressTransactions from './pages/Volunteer/InProgressTransaction';
import Achievements from './pages/Volunteer/Achievements';
import Payment from './pages/Volunteer/Payment';
import Simulation from './pages/Volunteer/Simulation';
import HomePageONG from './pages/ONG/homepage';
import Requests from './pages/ONG/Requests';
import AchievementsONG from './pages/ONG/AchievementsONG';
import BlockchainTrans from './pages/ONG/BlockchainTrans';
import Landingpage from './pages/landingpage';
function App() {
  return (
    <div className="font-lora flex flex-col relative overflow-hidden  w-screen">
   
      <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/homeVolunteer" element={<HomePage />} />
          <Route path="/transactionsVolunteerCompleted" element={<AchievedTransactions />} />
          <Route path="/transactionsVolunteerInProgress" element={<InProgressTransactions />} />
          <Route path="/achievementsVolunteer" element={<Achievements />} />
          <Route path="/paymentVolunteer" element={<Payment />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/homeONG" element={<HomePageONG />} />
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/AchievementsONG" element={<AchievementsONG/>}/>
          <Route path="/TransactionsONG" element={<BlockchainTrans/>}/>
          <Route path="/" element={<Landingpage/>}/>
        </Routes>
    </div>
  );
}

export default App;


