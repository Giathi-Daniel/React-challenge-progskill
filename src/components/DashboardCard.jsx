import { useAuth } from '../context/AuthContext';
import { BarChart, Users, ShoppingCart, CheckCircle } from "lucide-react";
import PropTypes from 'prop-types'

const DashboardCard = ({ title, value, icon: Icon, bgColor }) => {
  return (
    <div className="flex items-center gap-4 p-6 transition-transform duration-300 bg-white border-0 shadow-md cursor-pointer rounded-2xl hover:scale-105">
      <div className={`p-4 rounded-xl ${bgColor}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700">{title}</h3>
        <p className="text-xl font-semibold text-gray-500">{value}</p>
      </div>
    </div>
  );
};

// DashboardCards Component
const DashboardCards = () => {
  // Access the user object from AuthContext using useAuth hook
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-[5rem]">
      {/* Dashboard Cards */}
      <DashboardCard
        title="Total Users"
        value="1,250"
        icon={Users}
        bgColor="bg-blue-500"
      />
      <DashboardCard
        title="Total Sales"
        value="$23,400"
        icon={ShoppingCart}
        bgColor="bg-green-500"
      />
      <DashboardCard
        title="Monthly Revenue"
        value="$5,120"
        icon={BarChart}
        bgColor="bg-purple-500"
      />
      <DashboardCard
        title="Tasks Completed"
        value="87%"
        icon={CheckCircle}
        bgColor="bg-yellow-500"
      />

      {/* User-specific content */}
      <div className="max-w-6xl p-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">
          {user ? `Welcome back, ${user.displayName.split(' ')[0]}!` : 'Dashboard'}
        </h1>
        
        {user && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Personalized Content - User's Profile */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
              <h2 className="mb-4 text-xl font-semibold">Your Profile</h2>
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// prop validation
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,  
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default DashboardCards;
