import { Outlet } from "react-router-dom"
import SideNav from "./components/SideNav"

const DashboardPage = () => {
  return (
    <div className="flex gap-2">
        <SideNav />
        <Outlet />
    </div>
  )
}

export default DashboardPage