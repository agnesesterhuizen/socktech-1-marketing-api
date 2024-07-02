import { isValidEmail } from "./email";

describe("isValidEmail", () => {
  test("isValidEmail(validEmail) => true", () => {
    expect(isValidEmail("valid@test.com")).toBe(true);
  });

  test(`isValidEmail("") => false`, () => {
    expect(isValidEmail("")).toBe(false);
  });

  test("isValidEmail(invalid) => false", () => {
    expect(isValidEmail("invalid")).toBe(false);
  });
});
