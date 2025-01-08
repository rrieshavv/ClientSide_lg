import React, { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMenu, removeToken } from "../../../providers/CookieHandler";

const SideNav = () => {
  const [openMenus, setOpenMenus] = useState({});
  const Navigate = useNavigate();

  const menuItems = getMenu();
  // Menu items as per the provided JSON format
  // const menuItems = [
  //   {
  //     menu_id: 1,
  //     menu_name: "Dashboard",
  //     menu_logo: null,
  //     menu_path: "/dashboard",
  //     hasSubmenu: false,
  //     subMenus: [
  //       {
  //         sub_menu_id: 0,
  //         sub_menu_name: null,
  //         sub_menu_logo: null,
  //         sub_menu_path: null,
  //       },
  //     ],
  //   },
  //   {
  //     menu_id: 2,
  //     menu_name: "User Management",
  //     menu_logo: null,
  //     menu_path: null,
  //     hasSubmenu: true,
  //     subMenus: [
  //       {
  //         sub_menu_id: 1,
  //         sub_menu_name: "Dashboard",
  //         sub_menu_logo: null,
  //         sub_menu_path: "/user/dashboard",
  //       },
  //       {
  //         sub_menu_id: 2,
  //         sub_menu_name: "Roles",
  //         sub_menu_logo: null,
  //         sub_menu_path: "/users/roles",
  //       },
  //     ],
  //   },
  // ];

  const toggleMenu = (menuName, e) => {
    e.preventDefault();
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const logout = () => {
    removeToken();
    Navigate("/login");
  };

  return (
    <aside className="min-w-64 bg-orange-100 p-4 min-h-[calc(100vh-64px)] flex flex-col gap-2">
      {menuItems.map((item) => (
        <div key={item.menu_id}>
          {item.hasSubmenu ? (
            <div className="space-y-1">
              {/* Main menu with submenu */}
              <div
                onClick={(e) => toggleMenu(item.menu_name, e)}
                className="w-full rounded-md p-3 flex justify-between items-center bg-white hover:bg-gray-50 cursor-pointer"
              >
                {item.menu_name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    openMenus[item.menu_name] ? "rotate-180" : ""
                  }`}
                />
              </div>
              {/* Submenu items */}
              <div
                className={`transform origin-top transition-all duration-300 ease-in-out ${
                  openMenus[item.menu_name]
                    ? "h-auto opacity-100"
                    : "h-0 opacity-0"
                } overflow-hidden`}
              >
                {item.subMenus.map((subItem) => (
                  subItem.sub_menu_name && (
                    <NavLink
                      key={subItem.sub_menu_id}
                      to={subItem.sub_menu_path}
                      className={({ isActive }) =>
                        `w-full text-left pl-6 p-2 rounded-md block ${
                          isActive ? "bg-orange-200" : "hover:bg-orange-50"
                        }`
                      }
                    >
                      {subItem.sub_menu_name}
                    </NavLink>
                  )
                ))}
              </div>
            </div>
          ) : (
            // Main menu without submenu
            <NavLink
              to={item.menu_path}
              className={({ isActive }) =>
                `w-full rounded-md p-3 flex justify-between items-center ${
                  isActive ? "bg-orange-200" : "bg-white hover:bg-gray-50"
                }`
              }
            >
              {item.menu_name}
            </NavLink>
          )}
        </div>
      ))}
      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-auto bg-orange-100 p-3 flex items-center justify-center gap-2 rounded-md hover:bg-orange-200"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
};

export default SideNav;
