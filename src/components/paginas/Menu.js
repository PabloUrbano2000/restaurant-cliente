import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../firebase";
import Platillo from "../ui/Platillo";

const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [platillos, guardarPlatillos] = useState([]);

  useEffect(() => {
    const obtenerPlatillos = () => {
      // llamando a los platillos en tiempo real
      firebase.getDocumentsRealtime("productos", guardarPlatillos);

      // llamando a los platillos sin tiempo real
      // const resultado2 = await firebase.getDocuments("productos");
      // console.log(resultado2);
    };

    obtenerPlatillos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menú</h1>
      <Link
        to={"/nuevo-platillo"}
        exact="true"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold">
        Agregar Platillo
      </Link>
      {platillos.map((plat) => (
        <Platillo key={plat.id} platillo={plat} />
      ))}
    </>
  );
};

export default Menu;
