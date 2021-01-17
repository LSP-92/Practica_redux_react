import { defaultFilters } from "../components/adverts/AdvertsPage/FiltersForm";
const { createStore, combineReducers } = require("redux");

export const AUTH_LOGIN = "auth/LOGIN";
export const AUTH_LOGOUT = "auth/LOGOUT";
export const ADVERTS_CREATE = "ads/CREATE";
export const ADVERTS_DELETE = "ads/DELETE";
export const ADVERTS_TAGS = "ads/TAGS";
export const ADVERTS_ALL = "ads/ALL";

const defaultValue = {
  auth: false,
  adverts: { adverts: null },
  filters: { filters: defaultFilters },
};

export function auth(state = defaultValue, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, ...action.payload };
    case AUTH_LOGOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
function advert(state = defaultValue, action) {
  switch (action.type) {
    case ADVERTS_CREATE:
      state.adverts.push(action.payload);
      return {
        ...state,
      };
    case ADVERTS_DELETE:
      const fil = state.adverts.filter(({ _id }) => _id === action.payload);
      console.log(state.adverts.indexOf(fil));
      state.adverts.splice(state.adverts.indexOf(fil));
      return { ...state };
    case ADVERTS_ALL:
      return { ...state, adverts: action.payload };
    default:
      return state;
  }
}

function filters(state = defaultValue, action) {
  switch (action.type) {
    case ADVERTS_TAGS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
}

const reducers = combineReducers({
  auth: auth,
  adverts: advert,
  filters: filters,
});
export const store = createStore(
  reducers,
  defaultValue,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); // Creaos el store, pasandole un reducer y un estado

export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload: { auth: payload },
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
    payload: { auth: false },
  };
}

export function allAdeverts(payload) {
  return {
    type: ADVERTS_ALL,
    payload: payload,
  };
}

export function delAdeverts(payload) {
  return {
    type: ADVERTS_DELETE,
    payload: payload,
  };
}

export function tagsAdverts(payload) {
  return {
    type: ADVERTS_TAGS,
    payload: payload,
  };
}

export function newAdeverts(payload) {
  return {
    type: ADVERTS_CREATE,
    payload: payload,
  };
}
