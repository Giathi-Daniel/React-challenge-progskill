import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

import { ThemeProvider } from './context/ThemeProvider';

import NavBar from './components/NavBar';
import DashboardCards from './components/DashboardCard';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PromodoroTimer';
import Weather from './components/Weather';
import Quote from './components/Quote';
import SessionManagementModal from './components/SessionManagementModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import GdprConsent from "./components/GdprConsent";
import EmailVerification from "./components/EmailVerification";

function App() {
  const [consentGiven, setConsentGiven] = useState(false);

  // Check if consent is already given (either in LocalStorage or Firebase)
  useEffect(() => {
    const consentStatus = localStorage.getItem("gdpr-consent");
    if (consentStatus === "true") {
      setConsentGiven(true);
    }
  }, []);
  
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        
        {/* Session Management Modal */}
        <SessionManagementModal /> 

        <Routes>
          <Route path="/" element={<DashboardCards />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/timer" element={<PomodoroTimer />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/email-verification" element={<EmailVerification />} />
        </Routes>

        {!consentGiven && <GdprConsent />}

        {/* ToDo List Section */}
        <section id="todo-list" className="py-6 bg-gray-100">
          <h2 className="text-3xl font-bold text-center">To Do List</h2>
          <TodoList />
        </section>

        {/* Pomodoro Section */}
        <section id="timer" className="py-6">
          <h2 className="text-3xl font-bold text-center">Pomodoro Timer</h2>
          <PomodoroTimer />
        </section>

        {/* Weather Section */}
        <section id="weather" className="py-6 bg-gray-100">
          <h2 className="mb-4 text-3xl font-bold text-center">Weather API</h2>
          <Weather />
        </section>

        {/* Quote Section */}
        <section id="quote" className="py-6 bg-gray-100">
          <h2 className="mb-4 text-3xl font-bold text-center">QUOTE OF THE DAY</h2>
          <Quote />
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
