import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSearch } from "../Redux/actions";
import "./styles/SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    dispatch(
      setSearch({
        searchName: input,
        exactSearch: false 
      })
    );
    history.push("/list");
  };

  return (
    <div className="searchbar">
      <label className="searchlabel">Buscar Juego</label>
      <input
        className="inputbar"
        placeholder="Nombre"
        name="inputName"
        value={input}
        onChange={handleChange}
      />

      <input
        type="button"
        className="boton"
        value="Buscar"
        onClick={handleSubmit}
      />
      {/*         <div className="dropdownmenu">
          <input type="button" value="Hello" />
          <input type="button" value="Hello2" />
          <input type="button" value="Hello23535353535" />
        </div> */}
    </div>
  );
};

export default SearchBar;
