import { auth, AUTH_LOGIN, AUTH_LOGOUT } from "./index";

describe("auth", () => {
  test("Flujo Login", () => {
    const state = {
      auth: null,
    };
    const action = {
      type: AUTH_LOGIN,
      payload: { auth: "idUsuario" },
    };

    const expectedState = { auth: "idUsuario" };

    expect(auth(state, action)).toEqual(expectedState);
  });

  test("Flujo Logout", () => {
    const state = {
      auth: "idUsuario",
    };
    const action = {
      type: AUTH_LOGOUT,
      payload: { auth: false },
    };

    const expectedState = { auth: false };

    expect(auth(state, action)).toEqual(expectedState);
  });
});
