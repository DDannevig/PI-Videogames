const {
  GET_VIDEOGAME,
  GET_LIST_DISPAY,
  GET_GENRES,
  SET_SEARCH,
  SET_LIST_DISPAY,
  SET_PAGE,
  SET_FILTERS,
  SET_GENRES,
  SET_NEW_VIDEOGAME_GENRE,
  POST_GENRE,
  GET_BY_ID,
  SET_SEARCH_ID,
  UPDATE_VIDEOGAME_DESCRIPTION,
} = require("../consts.js");
/*
  state.order = {
    queorden = ["nombre", "genero"],
    comoordeno = ["ascendente", "descendente"]
  }
*/

const initialState = {
  videogameList: [],
  videogameFiltered: [],
  videogameDisplay: [],
  newVideogameGenre: [],
  genres: [],
  genreFlag: false,
  name: "",
  order: { mainorder: "name", suborder: "asc" },
  filters: {
    dbfilter: {
      api: true,
      rawg: true,
    },
    genres: [],
  },
  page: 0,
  pagetotal: 0,
  numberperpage: 15,
  searchName: "",
  searchID: "",
  searchFlag: false,
  searchIDChange: false,
  searchChange: false,
  searchExact: false,
};

export default function reducer(state = initialState, { type, payload }) {
  const name_asc = "name asc";
  const name_des = "name des";
  const rating_asc = "rating asc";
  const rating_des = "rating des";

  const sort = function (array, order) {
    let auxarr = [...array];
    let compare = order.slice(0, order.indexOf(" "));
    let compare2 = order.slice(order.indexOf(" ") + 1);

    let aux, swaps;
    for (let x = 0; x < array.length - 1; x++) {
      swaps = 0;

      for (let y = 0; y < auxarr.length - x - 1; y++) {
        if (!auxarr[y][compare]) auxarr[y][compare] = 1;
        if (auxarr[y][compare] > auxarr[y + 1][compare]) {
          aux = auxarr[y + 1];
          auxarr[y + 1] = auxarr[y];
          auxarr[y] = aux;
          swaps += 1;
        }
      }

      if (swaps === 0) {
        if (compare2 === "des") auxarr.reverse();
        return auxarr;
      }
    }
    if (compare2 === "des") auxarr.reverse();
    return auxarr;
  };

  const checkSource = function (game, sourceCheck) {
    let check1 = typeof game.id === "string" && sourceCheck[0][1] === true;
    let check2 = typeof game.id === "number" && sourceCheck[1][1] === true;

    return check1 || check2;
  };

  const filterList = function (list, sources) {
    let arr = [];
    list.forEach((element) => {
      //checkGenre(element, state.filters.genres);
      if (checkSource(element, sources) && true) arr.push(element);
    });
    return arr;
  };

  const checkGenre = function (list, genres) {
    let auxarr = [];
    let pushFlag = true;
    let auxGameGenre = [];
    list.forEach((gameObject) => {
      auxGameGenre = [];
      pushFlag = true;
      if (gameObject.genres) {
        gameObject.genres.forEach((gameGenre) =>
          auxGameGenre.push(gameGenre.name)
        );
        genres.forEach((genreName) => {
          if (auxGameGenre.indexOf(genreName) === -1) pushFlag = false;
        });

        if (pushFlag) {
          auxarr.push(gameObject);
        }
      }
    });
    return auxarr;
  };

  const translateDescription = function (rawDesc) {
    const p = "<p>";
    const pc = "</p>";
    const br = "<br />";
    const str = "<strong>";
    const strc = "</strong>";
    const bold = "&#39;";

    let index = rawDesc.indexOf(p);
    let index2 = rawDesc.indexOf(pc);
    let index3 = 0;
    let counter = 0;
    let res = [];
    let aux;

    index3 = rawDesc.indexOf(str);

    while (index3 !== -1) {
      rawDesc = rawDesc.replace(str, "");
      rawDesc = rawDesc.replace(strc, "");
      index3 = rawDesc.indexOf(str);
    }

    index3 = rawDesc.indexOf(bold);

    while (index3 !== -1) {
      rawDesc = rawDesc.replace(bold, "");
      index3 = rawDesc.indexOf(bold);
    }

    while (index !== -1) {
      aux = rawDesc.substring(index + p.length, index2);
      index3 = aux.indexOf(br);
      if (index3 !== -1) {
        while (index3 !== -1) {
          res.push(aux.substring(0, index3));
          res.push(<br key={"key_br_" + index3 + counter} />);
          counter++;
          aux = aux.substring(index3 + br.length);
          index3 = aux.indexOf(br);
        }
        res.push(aux);
      } else {
        res.push(<p key={"key_p_" + index + counter}>{aux}</p>);
        counter++;
      }

      rawDesc = rawDesc.replace(p, "");
      rawDesc = rawDesc.replace(pc, "");
      index = rawDesc.indexOf(p);
      index2 = rawDesc.indexOf(pc);
    }

    return res;
  };

  switch (type) {
    case GET_VIDEOGAME:
      state.videogameList = payload;
      state.videogameFiltered = sort(
        checkGenre(
          filterList(
            state.videogameList,
            Object.entries(state.filters.dbfilter)
          ),
          state.filters.genres
        ),
        state.order.mainorder + " " + state.order.suborder
      );

      return {
        ...state,
        searchChange: false,
        searchFlag: true,
        videogameDisplay:
          state.videogameFiltered.slice(0, state.numberperpage) || [],
        pagetotal: Math.ceil(
          state.videogameFiltered.length / state.numberperpage
        ),
        page: 0,
      };

    case GET_LIST_DISPAY:
      break;

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case SET_GENRES:
      return {
        ...state,
        genres: payload,
        genreFlag: true,
      };

    case SET_SEARCH:
      if (payload.searchName !== state.searchChange) {
        return {
          ...state,
          searchName: payload.searchName,
          searchFlag: true,
          searchChange: true,
          searchExact: payload.exactSearch,
        };
      } else return;

    case SET_SEARCH_ID:
      if (payload.searchID !== state.searchID) {
        return {
          ...state,
          searchID: payload.id,
          searchFlag: true,
          searchIDChange: true,
        };
      } else return;

    case SET_LIST_DISPAY:
      if (state.videogameFiltered.length === 0) {
        return {
          ...state,
          order: payload,
        };
      }

      switch (payload.mainorder + " " + payload.suborder) {
        case rating_asc:
          state.videogameFiltered = sort(state.videogameFiltered, rating_asc);

          break;

        case rating_des:
          state.videogameFiltered = sort(state.videogameFiltered, rating_des);

          break;

        case name_asc:
          state.videogameFiltered = sort(state.videogameFiltered, name_asc);

          break;

        case name_des:
          state.videogameFiltered = sort(state.videogameFiltered, name_des);

          break;

        default:
          break;
      }

      return {
        ...state,
        order: payload,
        videogameDisplay: state.videogameFiltered.slice(0, state.numberperpage),
        page: 0,
      };

    case SET_PAGE:
      return {
        ...state,
        videogameDisplay: state.videogameFiltered.slice(
          payload * state.numberperpage,
          payload * state.numberperpage + state.numberperpage
        ),
        page: payload,
      };

    case SET_FILTERS:
      /*
      {
        dbfilters: {
                    api: true,
                    rawg: false
                    }
        genres: ["action", "rpg"]
      }
      */
      state.videogameFiltered = state.videogameList;

      if (Object.keys(payload)[0] === "genres") {
        /*
          Filtro por genero y lo guardo en la videogameFiltered

          LLamo al checkGenre
        */
        state.filters = {
          ...state.filters,
          genres: payload.genres,
        };
      } else {
        const filt = Object.keys(payload)[0];

        state.filters.dbfilter = {
          ...state.filters.dbfilter,
          [filt]: payload[filt],
        };
      }

      if (state.filters.genres.length !== 0) {
        state.videogameFiltered = checkGenre(
          state.videogameList,
          state.filters.genres
        );
      }

      const sources = Object.entries(state.filters.dbfilter);

      state.videogameFiltered = sort(
        filterList(state.videogameFiltered, sources),
        state.order.mainorder + " " + state.order.suborder
      );
      return {
        ...state,
        videogameDisplay: state.videogameFiltered.slice(0, state.numberperpage),
        pagetotal: Math.ceil(
          state.videogameFiltered.length / state.numberperpage
        ),
        page: 0,
      };

    case SET_NEW_VIDEOGAME_GENRE:
      return {
        ...state,
        newVideogameGenre: payload.genres,
      };

    case POST_GENRE:
      return {
        ...state,
        genreFlag: true,
      };

    case GET_BY_ID:
      let RAWGflag = false;
      let aux;

      if (Array.isArray(payload)) {
        aux = payload.pop();
        RAWGflag = true;
      } else {
        aux = payload;
      }

      if (aux === "Error") {
        console.log(aux);
        return {
          ...state,
          searchIDChange: false,
          videogameList: [],
          videogameFiltered: [],
          videogameDisplay: [],
        };
      }

      let responseVideogame = {
        id: aux.id,
        name: aux.name,
        description: aux.description,
        launchdate: aux.launchdate,
        rating: aux.rating,
        image: aux.image,
        genres: [],
      };

      let auxGenre = [];
      let auxPlatforms = [];

      if (RAWGflag) {
        aux.platforms.forEach((element) => {
          auxPlatforms.push(element.platform.name);
        });
      } else {
        aux.platforms.forEach((element) => {
          auxPlatforms.push(element);
        });
      }
      aux.genres.forEach((element) => {
        auxGenre.push({ name: element.name });
      });
      responseVideogame.genres = auxGenre;
      responseVideogame.platforms = auxPlatforms;

      state.videogameList = [responseVideogame];
      state.videogameFiltered = state.videogameList;

      return {
        ...state,
        page: 0,
        pagetotal: Math.ceil(
          state.videogameFiltered.length / state.numberperpage
        ),
        videogameDisplay: state.videogameList,
        searchIDChange: false,
      };

    case UPDATE_VIDEOGAME_DESCRIPTION:
      let result = payload.pop();
      state.videogameList.forEach((element) => {
        if (element.id === result.id) {
          element.description = translateDescription(result.description);
        }
      });
      return { ...state };
    default:
      return state;
  }
}
