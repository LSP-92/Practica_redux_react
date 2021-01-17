import client from "./client";
import storage from "../utils/storage";
import { store, authLogout, authLogin } from "../store";

export const login = ({ remember, ...credentials }) =>
  client.login(credentials).then((auth) => {
    const { id, token } = auth;
    store.dispatch(authLogin(id));
    if (remember) {
      storage.set("auth", token);
    }
    return id;
  });

export const logout = () => {
  store.dispatch(authLogout());
  client.logout().then(() => {
    storage.remove("auth");
  });
};
