import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          RestaurantApp
        </p>
        <p className="mt-3 text-gray-600">
          Administra tu restaurant en las siguientes opciones:
        </p>
        <nav className="mt-10">
          <NavLink
            className={({ isActive }) => {
              return `p-1 block hover:bg-yellow-500 hover:text-gray-500 ${
                isActive ? "text-yellow-500" : "text-gray-400"
              }`;
            }}
            exact="true"
            to={"/"}>
            Órdenes
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return `p-1 block hover:bg-yellow-500 hover:text-gray-500 ${
                isActive ? "text-yellow-500" : "text-gray-400"
              }`;
            }}
            exact="true"
            to={"/menu"}>
            Menú
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
