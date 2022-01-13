const initialState = {
  characters: [],
  detail:[],
  allCharactes: [],
  occupations: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharactes: action.payload,
      };

    case "GET_NAME_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
      };

    case "FILTER_BY_STATUS":
      const allCharactes = state.allCharactes;
      const statusFiiltered =
        action.payload === "All"
          ? allCharactes
          : allCharactes.filter((el) => el.status === action.payload);

      return {
        ...state,
        characters: statusFiiltered,
      };

    case "POST_CHARACTER":
      return {
        ...state,
      };

    case "GET_OCCUPATIONS":
      return {
        ...state,
        occupations: action.payload,
      };
      
    case "FILTER_CREATED":
      const allCharactes2 = state.allCharactes;
      const createdFilter =
        action.payload === "created"
          ? allCharactes2.filter((el) => el.createdInDb)
          : allCharactes2.filter((el) => !el.createdInDb);
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharactes : createdFilter,
      };

    case "ORDER_BY_NAME":
      const orderName =
        action.payload === "Asc"
          ? state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: orderName,
      };

      case 'GET_DETAILS':
        return{
          ...state,
          detail:action.payload
          }

    default:
      return state;
  }
}

export default rootReducer;
