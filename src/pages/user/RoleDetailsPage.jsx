import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getRolePrivilegeDetail, updateRolePrivilege } from "../../services/rolesService";
import { useEffect, useState } from "react";

const RoleDetailsPage = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const id = params.get("id");
  const name = params.get("name");
  const [privileges, setPrivileges] = useState([]);

  useEffect(() => {
    getRoleDetails(id);
  }, []);

  const getRoleDetails = async (id) => {
    try {
      const res = await getRolePrivilegeDetail(id);
      if (res.code === 0) {
        setPrivileges(res.data);
      } else {
        toast.error(res.message);
        nav("/users/roles");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleChange = (submenuId) => {
    setPrivileges((prev) =>
      prev.map((priv) =>
        priv.submenu_id === submenuId
          ? { ...priv, has_access: !priv.has_access }
          : priv
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allowedSubmenuIds = privileges
      .filter((priv) => priv.has_access)
      .map((priv) => priv.submenu_id);

    const payload = {
      role_id: id,
      subMenu_id: allowedSubmenuIds,
    };

    try {
      const res = await updateRolePrivilege(payload);
      if (res.code === 0) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="w-full  mx-auto m-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">
          <Link to="/users/roles" className="text-blue-600 hover:underline">
            Role:
          </Link>{" "}
          {name.toUpperCase()}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        {privileges
          .reduce((acc, { menu_name }) => {
            if (!acc.includes(menu_name)) acc.push(menu_name);
            return acc;
          }, [])
          .map((menu) => (
            <div
              key={menu}
              className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                {menu}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {privileges
                  .filter((priv) => priv.menu_name === menu)
                  .map(({ submenu_id, submenu_name, has_access }) => (
                    <label
                      key={submenu_id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={submenu_id}
                        checked={has_access}
                        onChange={() => handleChange(submenu_id)}
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
                        {has_access && <span className="text-white">✔</span>}
                      </div>
                      <span className="text-gray-700">{submenu_name}</span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Update Privileges
        </button>
      </form>
    </div>
  );
};

export default RoleDetailsPage;
