import { useState } from 'react'

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#002E1D] p-4">
      <div className="mb-8">
        <img src="https://i.imgur.com/YiX5bZH.png" alt="Logo" className="w-32" />
      </div>
      <nav className="space-y-4">
        <a href="#" className="flex items-center text-white gap-3 p-2 rounded hover:bg-green-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </a>
        <a href="#" className="flex items-center text-white gap-3 p-2 rounded hover:bg-green-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" />
          </svg>
          Simulation
        </a>
        <a href="#" className="flex items-center text-white gap-3 p-2 rounded hover:bg-green-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Transactions
        </a>
        <a href="#" className="flex items-center text-white gap-3 p-2 rounded hover:bg-green-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Achievements
        </a>
      </nav>
    </div>
  )
}

function SearchBar() {
  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Enter the case you want to help"
          className="w-full p-2 pl-10 bg-gray-100 rounded-lg"
        />
        <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <select className="p-2 bg-gray-100 rounded-lg">
        <option>Case</option>
      </select>
      <select className="p-2 bg-gray-100 rounded-lg">
        <option>Location</option>
      </select>
      <select className="p-2 bg-gray-100 rounded-lg">
        <option>ONG</option>
      </select>
      <select className="p-2 bg-gray-100 rounded-lg">
        <option>Progress Status</option>
      </select>
    </div>
  )
}

function OrganizationCard() {
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-4">
        <img src="https://i.imgur.com/YiX5bZH.png" alt="El-Baraka" className="w-16 h-16" />
        <div>
          <h3 className="font-bold">El-Baraka</h3>
          <p className="text-sm text-gray-600">El-Baraka is an Algerian charity house dedicated to collecting donations for Palestine. Your support provides food, medical aid, and shelter to those in need.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#002E1D] text-white rounded-lg">Follow</button>
        <button className="px-4 py-2 border border-[#002E1D] text-[#002E1D] rounded-lg">View Profile</button>
      </div>
    </div>
  )
}

function CaseCard() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src="https://i.imgur.com/YiX5bZH.png" alt="Case" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold">Sponsor an Orphan in Gaza</h3>
        <div className="text-sm text-gray-600 mt-2">
          <p>Location: Gaza, Palestine</p>
          <p>Urgency: Ongoing</p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>$5,200</span>
            <span className="text-gray-500">$10,400</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full w-1/2 bg-green-600 rounded-full"></div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-[#002E1D] text-white rounded-lg">Donate now</button>
          <button className="flex-1 px-4 py-2 text-green-600 hover:text-green-700">See detail</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-end p-4">
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/YiX5bZH.png" alt="Profile" className="w-8 h-8 rounded-full" />
            <span>Remil Maha</span>
          </div>
        </div>
        <SearchBar />
        <div className="p-4">
          <div className="mb-8">
            <OrganizationCard />
            <OrganizationCard />
            <OrganizationCard />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <CaseCard />
            <CaseCard />
            <CaseCard />
            <CaseCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App