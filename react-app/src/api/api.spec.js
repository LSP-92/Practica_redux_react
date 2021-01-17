import { login } from "./auth";

describe("Test Api", () => {
  const credentials = {
    email: "user@example.com",
    password: "1234",
  };

  test("Login Async", async () => {
    const resul = await login(credentials);
    expect(typeof resul).toEqual("string");
  });
});
