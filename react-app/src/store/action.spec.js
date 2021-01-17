import { AUTH_LOGIN, authLogin, authLogout, AUTH_LOGOUT } from "./index";

describe("Test Actions", () => {
  test("Action AUTH_LOGIN", () => {
    const idUsuario = "test123456";
    const action = {
      type: AUTH_LOGIN,
      payload: { auth: idUsuario },
    };
    expect(authLogin(idUsuario)).toEqual(action);
  });

  test("Action AUTH_LOGOUT", () => {
    const idUsuario = false;
    const action = {
      type: AUTH_LOGOUT,
      payload: { auth: idUsuario },
    };
    expect(authLogout()).toEqual(action);
  });
});
