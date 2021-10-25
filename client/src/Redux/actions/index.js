import axios from "axios";

const URL = "http://localhost:3001/";

const {
  GET_VIDEOGAME,
  GET_LIST_DISPAY,
  GET_BY_ID,
  SET_GENRES,
  SET_SEARCH,
  SET_SEARCH_ID,
  SET_LIST_DISPAY,
  SET_PAGE,
  SET_FILTERS,
  POST_GENRE,
  POST_VIDEOGAME,
  UPDATE_VIDEOGAME_DESCRIPTION,
} = require("../consts.js");

export const getVideogame = (payload) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/game", {
        params: {
          search: payload.name,
          exactSearch: payload.exactSearch,
        },
      })
      .then((response) => {
        return dispatch({
          type: GET_VIDEOGAME,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getVideogameDisplay = (payload) => {
  return { type: GET_LIST_DISPAY, payload };
};

export const getGenres = () => {
  return (dispatch) => {
    axios
      .get(URL + "genre")
      .then((response) => {
        return dispatch({
          type: SET_GENRES,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setSearchID = (payload) => {
  return { type: SET_SEARCH_ID, payload };
};

export const setSearch = (payload) => {
  return { type: SET_SEARCH, payload };
};

export const setList_Display = (payload) => {
  return { type: SET_LIST_DISPAY, payload };
};

export const setPage = (payload) => {
  return { type: SET_PAGE, payload };
};

export const setFilters = (payload) => {
  return { type: SET_FILTERS, payload };
};

export const postGenre = (payload) => {
  axios.post(URL + "genre?name=" + payload.name);

  return { type: POST_GENRE };
};

export const postVideogame = (payload) => {
  axios({
    method: "post",
    url: URL + "game",
    data: payload,
  });

  return { type: POST_VIDEOGAME };
};

export const getById = (payload) => {
  return (dispatch) => {
    axios
      .get(URL + "game/id?ID=" + payload.id)
      .then((response) => {
        return dispatch({
          type: GET_BY_ID,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log("entro aca");
        console.log(err);
      });
  };
};

export const getExactVideogame = (payload) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/game", {
        params: {
          search: payload.name,
          exactSearch: "true",
        },
      })
      .then((response) => {
        let arrayres = [];
        if (!Array.isArray(response.data)) arrayres = [response.data];
        else arrayres = response.data;
        return dispatch({
          type: GET_VIDEOGAME,
          payload: arrayres,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getVideogameDescription = (payload) => {
  return (dispatch) => {
    try {
      axios
        .get(URL + "game/id?ID=" + payload.id)
        .then((response) => {
          return dispatch({
            type: UPDATE_VIDEOGAME_DESCRIPTION,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {}
  };
};
