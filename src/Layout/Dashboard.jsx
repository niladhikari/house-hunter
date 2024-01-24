

import {
    FaHome,
    FaList,
    FaUtensils,
  } from "react-icons/fa";
  import { NavLink, Outlet } from "react-router-dom";
import useHouseOwner from "../Hooks/useHouseOwner";


  
  const Dashboard = () => {
   const [isHouseOwner] = useHouseOwner();
   console.log(isHouseOwner);
    
  
    return (
      <div className="flex bg-[#F6F6F6]">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
          <h1 className="p-6">
            <span className="font-bold">House</span> <br /> Hunter
          </h1>
          <ul className="menu p-4">
            {isHouseOwner ? (
              <>
                <li>
                  <NavLink to="/dashboard/ownerHome">
                    <FaHome></FaHome>
                   HouseOwner Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addHouse">
                    <FaUtensils></FaUtensils>
                    Add House
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageHouse">
                  <FaList></FaList>
                    Manage House
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/houseRenter">
                    <FaHome></FaHome>
                    User Home
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    );
  };
  
  export default Dashboard;