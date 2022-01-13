import React, { Fragment as div, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCharactersByStatus,
  filterCreated,
  getCharacters,
  orderByName,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  /* Hooks */
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);
  const [order, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //Declaro estado local, pagina actual, y cual será la pagina actual y en que valor va arrancar
  const [characterPerPage, setCharactersPerpage] = useState(40); //Cantidad de caracteres por pagina, y en cuanto me va a mostrar las cards, osea 6 cards por caracteres por pagina
  const indexOfLastCharacter = currentPage * characterPerPage; // 6 seteo el index del ultimo caracter y lo multiplico por la cantidad de caracteres por pagina
  const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage; //0 Seteo indice del primer caracterer, El indice del ultimo menos caracteres por pagina.
  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  /* Esta función es la que genera la acción del botón de abajo -> */
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  function handlerFilterStatus(e) {
    dispatch(filterCharactersByStatus(e.target.value)); //toma los valores que clickea el usuario
  }

  function handlerFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrder(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(orderByName(e.target.value));
  }

  return (
    <div>
      <Link to="/character">Crear Personaje</Link>
      <h1>Bienvenidos</h1>
      {/* de este boton -> */}
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los personajes
      </button>
      <div>
        <select onChange={(e) => handleOrder(e)}>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        <select onChange={(e) => handlerFilterStatus(e)}>
          <option value="All">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Deceased">Muerto</option>
          <option value="Unknown">Desconocido</option>
          <option value="Presumed dead">Probablemente</option>
        </select>
        <select onChange={(e) => handlerFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">De la API</option>
        </select>
        <Paginado
          characterPerPage={characterPerPage}
          allCharacter={allCharacters.length}
          paginado={paginado}
        />
        <SearchBar />
        <div className="tarjetas">
          {currentCharacters?.map((el) => {
            return (
              <div>
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.img ? el.img : el.image}
                    nickname={el.nickname}
                    key={el.id}
                    id={el.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
