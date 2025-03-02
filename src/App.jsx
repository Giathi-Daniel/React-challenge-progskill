import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";

import NavBar from "./components/NavBar";
import DashboardCards from "./components/DashboardCard";
import TodoList from "./components/TodoList";
import PomodoroTimer from "./components/PromodoroTimer";
import Weather from "./components/Weather";
import Quote from "./components/Quote";

function App() {
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardCards />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/timer" element={<PomodoroTimer />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/quote" element={<Quote />} />
        </Routes>

        {/* ToDo List Section */}
        <section id="todo-list" className="py-6 bg-gray-100">
          <h2 className="text-3xl font-bold text-center">To Do List</h2>
          <TodoList />
        </section>

        {/* Promodoro Section */}
        <section id="timer" className="py-6">
          <h2 className="text-3xl font-bold text-center">Promodoro Timer</h2>
          <PomodoroTimer />
        </section>

        {/* WEATHER Section */}
        <section id="weather" className="bg-gray-100 py-6">
          <h2 className="text-3xl font-bold text-center mb-4">Weather API</h2>
          <Weather />
        </section>

        {/* QUOTE Section */}
        <section id="quote" className="bg-gray-100 py-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            QUOTE OF THE DAY
          </h2>
          <Quote />
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
