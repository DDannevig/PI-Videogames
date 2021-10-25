import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles/AdvancedSearch.css";
import useDetectClickOut from "../Redux/hooks";
import { setSearchID, setSearch } from "../Redux/actions/index.js";

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { triggerRef, nodeRef, show } = useDetectClickOut(false);
  const [searchName, setsearchName] = useState("");
  const [searchID, setsearchID] = useState("");
  const searchExact = useSelector((state) => state.searchExact);
  const [exactSearch, setexactSearch] = useState(searchExact);

  useEffect(() => {}, []);

  const onChange_TextBar = function (e) {
    setsearchName(e.target.value);
  };

  const onChange_searchID = function (e) {
    setsearchID(e.target.value);
  };

  const onChange_exactSearch = function (e) {
    console.log(e.target.checked);
    setexactSearch(e.target.checked);
  };

  const onClick_SearchGame = function (e) {
    console.log(e.target);
    console.log(exactSearch, searchName);

    console.log("Exact Search: ", exactSearch);
    dispatch(setSearch({ searchName: searchName, exactSearch: exactSearch }));

    setsearchName("");
    history.push("/list");
  };

  const onClick_searchID = () => {
    setsearchID("");
    dispatch(setSearchID({ id: searchID }));
    history.push("/list");
  };

  const searchMenu = (
    <div ref={nodeRef} className="advancedSearchContainer">
      <div className="searchContainer">
        <div className="searchContainerElement">
          <label>Buscar por nombre </label>
          <input
            type="text"
            className="busqueda"
            value={searchName}
            onChange={onChange_TextBar}
          />
        </div>
        <div>
          <label>Búsqueda Exacta</label>
          <input
            type="checkbox"
            value={exactSearch}
            checked={exactSearch}
            onChange={onChange_exactSearch}
          />
        </div>
        <div className="searchContainerElement">
          <input type="submit" value="Buscar" onClick={onClick_SearchGame} />
        </div>
      </div>
      <br />
      <div className="searchContainer">
        <label>Buscar por ID </label>
        <input
          type="text"
          className="busqueda"
          value={searchID}
          onChange={onChange_searchID}
        />
        <div className="searchContainerElement">
          <input type="button" value={"Buscar"} onClick={onClick_searchID} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mainContainer">
      <input
        type="button"
        className="inputbar"
        value="Búsqueda Avanzada"
        ref={triggerRef}
      />
      <div>{show ? searchMenu : null}</div>
    </div>
  );
};

export default AdvancedSearch;
