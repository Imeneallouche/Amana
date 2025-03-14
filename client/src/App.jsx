import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import SideBar from './components/SideBar';
import ONGCard from './components/ONGCard';
import DonationCard from './components/PostCard';
import ONGSlider from './components/ONGSlider';
import DonationGrid from './components/PostsGrid';
import  SearchFilters from './components/Search';
import Header from './components/Header';
function App() {
  return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
      {/* Sidebar with fixed width */}
      <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

      {/* Main content area */}
      
      <div className="flex-1 flex flex-col overflow-auto">
        <Header/>
        <div className='ml-12'>

      <SearchFilters className='mr-12' />
      
        <ONGSlider className="w-full" />
        </div>
        <p className='font-jakarta text-[24px] font-bold ml-12 text-myblack'>Current Campaigns You Can Contribute To</p>
        <div className="flex-1 overflow-auto px-6">
          <DonationGrid />
        </div>
      </div>
    </div>
  );
}

export default App;


