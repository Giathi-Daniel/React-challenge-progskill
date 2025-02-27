import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardCards from "./components/DashboardCard";
import TodoList from "./components/TodoList"; 
import PomodoroTimer from "./components/PromodoroTimer";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardCards />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/timer" element={<PomodoroTimer />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
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
    </div>
  );
}

export default App;
