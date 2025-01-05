import { NavLink } from "react-router-dom";

const getLinkClasses = (isActive) =>
  isActive ? "text-blue-500 font-bold" : "text-gray-500";

const SideNav = () => (
  <div className="flex flex-col gap-2 w-1/6">
    <NavLink to="/dashboard/profile" className={({ isActive }) => getLinkClasses(isActive)}>
      Profile
    </NavLink>
    <NavLink to="/dashboard/user" className={({ isActive }) => getLinkClasses(isActive)}>
      User Management
    </NavLink>
  </div>
);

export default SideNav;
