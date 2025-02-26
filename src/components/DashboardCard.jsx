import { BarChart, Users, ShoppingCart, CheckCircle } from "lucide-react";

const DashboardCard = ({ title, value, icon: Icon, bgColor }) => {
  return (
    <div className="bg-white shadow-md border-0 p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className={`p-4 rounded-xl ${bgColor}`}>
        <Icon className="text-white w-8 h-8" />
      </div>
      <div>
        <h3 className="text-gray-700 text-sm font-bold">{title}</h3>
        <p className="text-gray-500 text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-[5rem]">
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
    </div>
  );
};

export default DashboardCards;
