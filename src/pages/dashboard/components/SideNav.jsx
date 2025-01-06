import React, { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../../../providers/CookieHandler';

const SideNav = () => {
  const [openMenus, setOpenMenus] = useState({});

  const Navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', hasSubmenu: false },
    { name: 'Organization', path: '/organization', hasSubmenu: true },
    { 
      name: 'User Management', 
      hasSubmenu: true,
      submenu: [
        { name: 'Dashboard', path: '/user/dashboard' },
        { name: 'Roles', path: '/users/roles' }
      ]
    },
    { name: 'Employee Wizard', path: '/employee', hasSubmenu: true },
    { name: 'Time Tracking', path: '/time', hasSubmenu: true },
    { name: 'Settings', path: '/settings', hasSubmenu: true }
  ];

  const toggleMenu = (menuName, e) => {
    e.preventDefault();
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const logout = ()=>{
    removeToken();
    Navigate('/login');
  }

  return (
    <aside className="w-64 bg-orange-100 p-4 min-h-[calc(100vh-64px)] flex flex-col gap-2">
      {menuItems.map((item) => (
        <div key={item.name}>
          {item.hasSubmenu ? (
            <div className="space-y-1">
              <div 
                onClick={(e) => toggleMenu(item.name, e)}
                className="w-full rounded-md p-3 flex justify-between items-center bg-white hover:bg-gray-50 cursor-pointer"
              >
                {item.name}
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    openMenus[item.name] ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              <div 
                className={`transform origin-top transition-all duration-300 ease-in-out ${
                  openMenus[item.name] ? 'h-auto opacity-100' : 'h-0 opacity-0'
                } overflow-hidden`}
              >
                {item.submenu?.map(subItem => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.path}
                    className={({ isActive }) =>
                      `w-full text-left pl-6 p-2 rounded-md block ${
                        isActive ? 'bg-orange-200' : 'hover:bg-orange-50'
                      }`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink 
              to={item.path}
              className={({ isActive }) => 
                `w-full rounded-md p-3 flex justify-between items-center ${
                  isActive ? 'bg-orange-200' : 'bg-white hover:bg-gray-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          )}
        </div>
      ))}
      <button onClick={()=>logout()} className="mt-auto bg-orange-100 p-3 flex items-center justify-center gap-2 rounded-md hover:bg-orange-200">
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
};

export default SideNav;