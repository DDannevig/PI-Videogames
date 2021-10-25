import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postGenre, postVideogame } from "../Redux/actions";
import { SET_NEW_VIDEOGAME_GENRE } from "../Redux/consts";
import GenreFilterMenu from "./GenreFilterMenu";
import useDetectClickOut from "../Redux/hooks";
import "./styles/Create.css";

const Create = () => {
  const dispatch = useDispatch();
  const { triggerRef, nodeRef, show } = useDetectClickOut(false);
  const [changeCreation, setchangeCreation] = useState(false);
  const [inputName, setinputName] = useState("");
  const [inputRating, setinputRating] = useState(0.0);
  const [inputDate, setinputDate] = useState("");
  const [inputImg, setinputImg] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [inputPlatform, setinputPlatform] = useState("");
  const [inputGenreName, setinputGenreName] = useState("");
  const [arrayPlatforms, setarrayPlatforms] = useState([]);
  const [showSelectedPlatforms, setshowSelectedPlatforms] = useState("false");
  const { newVideogameGenre, genres } = useSelector((state) => state);
  const [, setinput_Genre] = useState([]);

  useEffect(() => {}, [showSelectedPlatforms]);

  const onClick_ChangeCreation = () => {
    setchangeCreation(!changeCreation);
  };

  const onChange_Name = (e) => {
    setinputName(e.target.value);
  };

  const onChange_Rating = (e) => {
    setinputRating((Math.round(e.target.value * 100) / 100).toFixed(2));
  };

  const onChange_Date = (e) => {
    setinputDate(e.target.value);
  };

  const onChange_Img = (e) => {
    setinputImg(e.target.value);
  };

  const onChange_Description = (e) => {
    setinputDescription(e.target.value);
  };

  const onChange_Platform = (e) => {
    setinputPlatform(e.target.value);
  };

  const onClick_Platform = () => {
    if (!(inputPlatform === "")) {
      arrayPlatforms.push(inputPlatform);
      setarrayPlatforms([...arrayPlatforms]);
      setinputPlatform("");
    }
  };

  const onClick_PlatformButton = (e) => {
    arrayPlatforms.splice(arrayPlatforms.indexOf(e.target.name), 1);
    setarrayPlatforms([...arrayPlatforms]);
  };

  const onClick_showSelectedPlatforms = () => {
    setshowSelectedPlatforms(!showSelectedPlatforms);
  };

  const onClick_div_create = (e) => {
    console.log(e);
    console.log(e.target);
  };

  const onSubmit_Form = (event) => {
    event.preventDefault();
    if (inputName === "") {
      alert("Nombre vacío");
      return;
    }
    if (inputDate === "") {
      alert("Date vacío");
      return;
    }
    if (inputRating === "") {
      alert("Rating vacío");
      return;
    }
    if (inputDescription === "") {
      alert("Description vacío");
      return;
    }
    // alert('A name was submitted: ' + event.target.value);
    event.preventDefault();
    const newVideogame = {
      name: inputName,
      genres: newVideogameGenre,
      rating: inputRating,
      launchdate: inputDate,
      image: inputImg,
      platforms: arrayPlatforms,
      description: inputDescription,
    };

    let aux = [];
    let grs = [];
    genres.forEach((element) => {
      aux.push(element.name);
    });
    newVideogame.genres.forEach((element) => {
      grs.push(aux.indexOf(element));
    });

    newVideogame.genres = grs;

    dispatch(postVideogame(newVideogame));
    setinputName("");
    setinput_Genre([]);
    setinputRating(0);
    setinputDate("");
    setinputImg("");
    setarrayPlatforms([]);
    setinputDescription("");
  };

  const onClick_postGenre = () => {
    dispatch(
      postGenre({
        name: inputGenreName,
      })
    );
    setinputGenreName("");
  };

  const selectedPlatforms = () => {
    return (
      <div className="showList">
        {arrayPlatforms.length === 0 ? (
          <label>No hay plataforma agregada</label>
        ) : (
          selectedPlatformsContainer()
        )}
      </div>
    );
  };

  const selectedPlatformsContainer = () => {
    return arrayPlatforms.map((platform) => {
      return (
        <input
          type="button"
          className="inputbar"
          name={"btnAdd." + platform}
          value={platform}
          onClick={onClick_PlatformButton}
        />
      );
    });
  };

  const onChange_GenreName = (e) => {
    setinputGenreName(e.target.value);
  };

  const createGame = (
    <div className="inputsContainer" onMouseDown={onClick_div_create}>
      <input
        type="button"
        name="btn.SwitchGenre"
        value={"Cambiar a " + (changeCreation ? "juego" : "género")}
        onClick={onClick_ChangeCreation}
      />
      <label>Crear Juego</label>
      <form onSubmit={onSubmit_Form}>
        <div className="inputContainer">
          <label>Nombre </label>
          <input
            type="text"
            name="input-text.Name"
            className="inputbar"
            placeholder="Nombre"
            value={inputName}
            onChange={onChange_Name}
          />
        </div>

        <div className="inputContainer">
          <label>Géneros</label>
          {GenreFilterMenu(SET_NEW_VIDEOGAME_GENRE)}
        </div>
        <div className="inputContainer">
          <label>Rating </label>
          <input
            type="range"
            name="ratingSlider"
            min="0.0"
            max="5.0"
            step="0.01"
            value={inputRating}
            onChange={onChange_Rating}
          />
          <input
            type="number"
            name="ratingArrows"
            min="0.0"
            max="5.0"
            step="0.01"
            value={inputRating}
            onChange={onChange_Rating}
          />
        </div>

        <div className="inputContainer">
          <label>Lanzamiento</label>
          <input
            type="date"
            name="inputDate"
            value={inputDate}
            onChange={onChange_Date}
          />
        </div>

        <div className="inputContainer">
          <label>Imágen</label>
          <input
            type="url"
            name="inputURL"
            className="inputbar"
            placeholder="URL"
            value={inputImg}
            onChange={onChange_Img}
          />
        </div>
        <div className="inputContainer">
          <label>Plataformas</label>
          <div className="platformContainer">
            <input
              type="text"
              name="inputText"
              className="inputbar"
              placeholder="Plataforma"
              value={inputPlatform}
              onChange={onChange_Platform}
            />
            <div className="platformContainer2">
              <input
                type="button"
                name="btnAddPlatform"
                className="inputbar"
                value="Agregar"
                onClick={onClick_Platform}
              />
              <div>
                <input
                  type="button"
                  name="btnShowList"
                  className="inputbar"
                  value="Mostrar Lista"
                  onClick={onClick_showSelectedPlatforms}
                />
                {showSelectedPlatforms ? null : selectedPlatforms()}
              </div>
            </div>
          </div>
        </div>

        <div className="inputContainer">
          <label>Descripción </label>
          <textarea
            className="inputbar"
            name="textareaDescription"
            value={inputDescription}
            onChange={onChange_Description}
          ></textarea>
        </div>
        <input
          type="submit"
          name="btnSubmit"
          className="submitBtn"
          value="Crear Videojuego"
          onClick={onSubmit_Form}
        />
      </form>
    </div>
  );

  const createGenre = (
    <div className="inputsContainer">
      <input
        type="button"
        name="btnSwitchGame"
        value={"Cambiar a " + (changeCreation ? "juego" : "género")}
        onClick={onClick_ChangeCreation}
      />
      <label>Crear Género</label>
      <div className="inputContainer">
        <label>Nombre </label>
        <input
          type="text"
          name="input-text.GenreName"
          className="inputbar"
          placeholder="Nombre"
          value={inputGenreName}
          onChange={onChange_GenreName}
        />
      </div>
      <input
        type="button"
        name="btn.PostGenre"
        className="submitBtn"
        value="Crear Género"
        onClick={onClick_postGenre}
      />
    </div>
  );

  const createMenu = (
    <div ref={nodeRef}>{changeCreation ? createGenre : createGame}</div>
  );

  return (
    <div className="showMenu">
      <input
        type="button"
        name="btn.ShowMenu"
        className="inputbar"
        value="Crear"
        ref={triggerRef}
      />
      <div>{show ? createMenu : null}</div>
    </div>
  );
};

export default Create;
