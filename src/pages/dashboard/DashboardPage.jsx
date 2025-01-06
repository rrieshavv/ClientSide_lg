import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import { User } from "lucide-react";
import logo from "../../assets/Logo.png";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 ">
      <nav className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-12" />
          <div>
            <h1 className="font-bold">ABC Organization Pvt. Ltd.</h1>
            <p className="text-sm text-gray-500">Powered by HrLog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-8 h-8" />
          <span>Super Admin</span>
        </div>
      </nav>
      <div className="flex gap-3">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
