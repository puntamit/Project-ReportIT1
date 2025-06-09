import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import TicketForm from '../components/TicketForm'

const HomeUser = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const userName = localStorage.getItem('userName');
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={() => setIsOpen(!isOpen)}
        userRole="user"
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Header activeTab={activeTab} userName={userName} userRole="user" />
        <div className="p-6">
          <TicketForm />
        </div>
      </div>
    </div>
  )
}

export default HomeUser
