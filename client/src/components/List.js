import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogame,
  setList_Display,
  setPage,
  setFilters,
  getById,
} from "../Redux/actions/index.js";
import { SET_FILTERS } from "../Redux/consts.js";

import GameCard from "./GameCard.js";
import GenreFilterMenu from "./GenreFilterMenu.js";
import "./styles/List.css";

const List = () => {
  const {
    genres,
    genreFlag,
    videogameFiltered,
    videogameDisplay,
    searchExact,
    searchFlag,
    searchName,
    searchChange,
    searchID,
    searchIDChange,
    order,
    pagetotal,
    page,
    filters,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [mainorder_Type, setmainorder_Type] = useState(order.mainorder);
  const [suborder_Type, setsuborder_Type] = useState(order.suborder);
  const [currentPage, setcurrentPage] = useState(0);

  useEffect(() => {
    if (searchFlag === true && searchChange === true) {
      dispatch(
        getVideogame({
          name: searchName,
          exactSearch: searchExact,
        })
      );
      setcurrentPage(0);
    }
  }, [dispatch, searchName, searchChange, searchFlag, searchExact]);

  useEffect(() => {
    if (searchIDChange === true && searchFlag === true) {
      dispatch(
        getById({
          id: searchID,
        })
      );
      setcurrentPage(0);
    }
  }, [dispatch, searchIDChange, searchFlag, searchID]);

  useEffect(() => {
    setcurrentPage(0);
  }, [order, filters, genres]);

  useEffect(() => {
    setcurrentPage(page);
  }, [dispatch, videogameDisplay, genreFlag, page]);

  const onChange_mainorderLabel = (e) => {
    setmainorder_Type(e.target.value);
    dispatch(
      setList_Display({
        mainorder: e.target.value,
        suborder: suborder_Type,
      })
    );
  };

  const onChange_suborderLabel = (e) => {
    setsuborder_Type(e.target.value);
    dispatch(
      setList_Display({
        mainorder: mainorder_Type,
        suborder: e.target.value,
      })
    );
  };

  const onChange_currentPage = (e) => {
    setcurrentPage(parseInt(e.target.value));
    dispatch(setPage(parseInt(e.target.value)));
  };

  const onClick_nextPage = () => {
    if (pagetotal - 1 >= page + 1) {
      setcurrentPage(parseInt(page + 1));
      dispatch(setPage(parseInt(page + 1)));
    }
  };

  const onClick_previousPage = () => {
    if (page - 1 >= 0) {
      setcurrentPage(parseInt(page - 1));
      dispatch(setPage(parseInt(page - 1)));
    }
  };

  const onChange_API_check = (e) => {
    dispatch(
      setFilters({
        api: e.target.checked,
      })
    );
  };

  const onChange_rawg_check = (e) => {
    dispatch(
      setFilters({
        rawg: e.target.checked,
      })
    );
  };

  const getPaging = (num) => {
    var array = [];
    if (num === 0) return <option value={0}>{0}</option>;
    else {
      for (let i = 0; i < num; i++) {
        array.push(i);
      }
      return array.map((element) => {
        return (
          <option value={element} key={"id.key.option." + element}>
            {element + 1}
          </option>
        );
      });
    }
  };

  const filterbar = (
    <div className="mainFilterContainer">
      <div className="filterBuffer"></div>
      <div className="filterBar">
        <label className="element">
          Resultados: {videogameFiltered.length}
        </label>
        <br />
        <div className="orderContainer">
          <div className="filtercontainer">
            <label className="filterLabel">Ordenar por</label>
            <select
              className="selectLabel"
              name={"mainorder"}
              value={mainorder_Type}
              onChange={onChange_mainorderLabel}
            >
              <option value="name">Nombre</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="filtercontainer">
            <label className="filterLabel">De forma</label>
            <select
              className="selectLabel"
              name={"suborder"}
              value={suborder_Type}
              onChange={onChange_suborderLabel}
            >
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
            </select>
          </div>
        </div>
        <br />
        <div>
          <div className="filterContainer">
            <label>Filtrado</label>
            <div className="inputFilter">
              <div>
                <label>Géneros</label>
                {GenreFilterMenu(SET_FILTERS)}
              </div>
              <div className="dbFilter">
                <div>
                  <label>API</label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={onChange_API_check}
                  />
                </div>
                <div>
                  <label>RAWG</label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={onChange_rawg_check}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div className="pagination">
            <div className="paginationElement">
              <label>Página </label>
              <select value={currentPage} onChange={onChange_currentPage}>
                {getPaging(pagetotal)}
              </select>
            </div>

            <label className="paginationElement"> de {pagetotal}</label>
          </div>
          <br />
          <div className="elements">
            <button className="btnPage" onClick={onClick_previousPage}>
              Página anterior
            </button>
            <button className="btnPage" onClick={onClick_nextPage}>
              Próxima pagina
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const showcards = (array) => {
    if (searchFlag === true && searchChange === true)
      return (
        <div className="loaderContainer">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    else {
      if (array[0] === null || array.length === 0)
        return (
          <div className="messageContainer">
            <p className="listMessage">No se encontraron resultados</p>
          </div>
        );
      else {
        return (
          <div className="gameCards">
            {array.map((videogame) => (
              <GameCard
                name={videogame.name}
                description={videogame.description}
                launchdate={videogame.launchdate}
                platforms={videogame.platforms}
                rating={videogame.rating}
                key={"id.gamecard." + videogame.name}
                genres={videogame.genres}
                image={videogame.image}
                id={videogame.id}
              />
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="bodyContainer">
      {filterbar}
      <div className="bodyDisplay">
        {searchFlag ? (
          showcards(videogameDisplay)
        ) : (
          <div className="messageContainer">
            <p className="listMessage">
              Ingrese un nombre en la barra de búsqueda para encontrar
              resultados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
