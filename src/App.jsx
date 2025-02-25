import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardCards from "./components/DashboardCard";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/cards' element={<DashboardCards />} />
      </Routes>
    </div>
  );
}

export default App;
