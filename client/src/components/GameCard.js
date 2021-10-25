import React from "react";
import { getVideogameDescription } from "../Redux/actions";
import { useDispatch } from "react-redux";
import "./styles/GameCard.css";

const defaultPicture =
  "https://cdn.w600.comps.canstockphoto.com/video-game-controllers-icon-set-vector-clipart_csp32916003.jpg";

export default function GameCard({
  name,
  id,
  rating,
  platforms,
  description,
  launchdate,
  genres,
  image,
}) {
  const dispatch = useDispatch();

  const changeDefault = (ev) => {
    ev.target.src = defaultPicture;
  };

  const onMouseOverCard = (e) => {
    try {
      if (e.target.lastChild.lastChild.lastChild.innerHTML === "") {
        dispatch(getVideogameDescription({ id: id }));
      }
    } catch {}
    try {
      e.target.lastChild.lastChild.lastChild.className = "card-text";
    } catch {}
  };

  const onMouseLeaveCard = (e) => {
    try {
      e.target.lastChild.lastChild.lastChild.className = "hide-element";
    } catch {}
  };

  if (!image) image = defaultPicture;
  if (!launchdate) launchdate = "-";
  return (
    <div
      className="card"
      onMouseEnter={onMouseOverCard}
      onMouseOver={onMouseOverCard}
      onMouseLeave={onMouseLeaveCard}
    >
      <div className="card-header">
        <div className="card-title-group">
          <h1 className="card-title">{name}</h1>
          <p className="card-date">{launchdate}</p>
        </div>
        <div className="card-points">{rating}</div>
      </div>
      <div className="imageContainer">
        <img
          className="image"
          alt="source: RAWG"
          onError={changeDefault}
          src={image}
        />
      </div>
      <div>
        <div className="cardBody">
          <div className="card-platforms">
            {platforms.length !== 0 ? (
              platforms.map((e) => {
                return (
                  <label className="label-platform" key={"platforms.key." + e}>
                    {e}
                  </label>
                );
              })
            ) : (
              <label className="label-platform" key={"platforms.key.Missing"}>
                {"Missing"}
              </label>
            )}
          </div>
          <div className="platform-genres-div" />
          <div className="genresContainer">
            {genres.length !== 0 ? (
              genres.map((e) => {
                return (
                  <label className="label-genre" key={"genres.key." + e.name}>
                    {e.name}
                  </label>
                );
              })
            ) : (
              <label className="label-genre" key={"genres.key.Missing"}>
                {"Missing"}
              </label>
            )}
          </div>
        </div>
        <div />

        <div className="card-text-container">
          <div className="hide-element">
            {Array.isArray(description)
              ? description.map((element) => {
                  return element;
                })
              : description}
          </div>
        </div>
      </div>
    </div>
  );
}
