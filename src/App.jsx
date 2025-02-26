import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardCards from "./components/DashboardCard";
import TodoList from "./components/TodoList"; // Assuming this is your ToDoList component
// import Services from "./components/Services"; // Add your Services component
// import Contact from "./components/Contact"; // Add your Contact component

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardCards />} />
        <Route path="/todo-list" element={<TodoList />} />
        {/* <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>

      {/* ToDo List Section */}
      <section id="todo-list" className="py-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center">To Do List</h2>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
