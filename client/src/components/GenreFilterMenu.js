import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../Redux/actions/index.js";
import "./styles/GenreFilterMenu.css";

export default function GenreFilterMenu(type) {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state);
  const [showGenreMenu, setshowGenreMenu] = useState(false);
  const [genreArray] = useState([]);

  useEffect(() => {}, [genres, showGenreMenu, genreArray]);

  const onClick_Genres = () => {
    if (showGenreMenu === false) {
      dispatch(getGenres());
    }
    if (showGenreMenu === true) {
      dispatch({
        type: type,
        payload: { genres: genreArray },
      });
      /*
      este es para Lista {
        type: SET_FILTERS
        genres: genreArray
      }

      {
        type: SET_NEWVIDEOGAME_GENRE
        genres: genreArray
      }
      dispatch array a store global
      por parametro de GFU le paso a donde despatcha
      dispatch(
        setNewGameArray(genreArray)
        || setFilterArray(genreArray)
      ) 
      */
    }
    setshowGenreMenu(!showGenreMenu);
  };

  const onClick_Genre_button = function (e) {
    let index = genreArray.indexOf(e.target.value);
    if (index === -1) {
      genreArray.push(e.target.value);
      e.target.className = "buttonOn";
    } else {
      genreArray.splice(index, 1);
      e.target.className = "buttonOff";
    }
  };

  const filterButtons = (
    <div className="filterButtonsContainer">
      {genres.map((element, index) => {
        return (
          <input
            type="button"
            key={"id.key.input.genre." + index + element}
            className={
              genreArray.indexOf(element.name) !== -1 ? "buttonOn" : "buttonOff"
            }
            value={element.name}
            onClick={onClick_Genre_button}
          />
        );
      })}
    </div>
  );

  const genreMenu =
    !genres || genres.length === 0 ? <h5>Loading...</h5> : filterButtons;

  return (
    <div>
      <input type="button" onClick={onClick_Genres} value={"Agregar"} />
      <div className="genreButtonContainer">
        {showGenreMenu ? genreMenu : null}
      </div>
    </div>
  );
}
