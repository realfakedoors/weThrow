/* eslint-disable */
import React from "react";
import axios from "axios";
import mockAdapter from "axios-mock-adapter";

import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
  cleanup,
} from "@testing-library/react";

import App from "../components/App";

const mock = new mockAdapter(axios);

const mockUser = {
  email: "rocko1@o-town.com",
  password: "spunky",
};

beforeEach(() => render(<App />));
afterEach(cleanup);

test("A user can sign up for an account", async () => {
  fireEvent.click(screen.getByText("Sign Up"));
  await waitFor(() => {
    expect(
      screen.getByText("Enter your email and password to create an account!")
    );
  });
  fireEvent.change(screen.getByTestId(/signup-email/), {
    target: { value: mockUser.email },
  });
  fireEvent.change(screen.getByTestId(/signup-password/), {
    target: { value: mockUser.password },
  });
  fireEvent.change(screen.getByTestId(/signup-confirmation/), {
    target: { value: mockUser.password },
  });
  mock.onPost("users").reply(201, {});
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(screen.getByText("Check your email!"));
  });
});

test("If a user tries to sign up with invalid info, they see an error message", async () => {
  fireEvent.click(screen.getByText("Sign Up"));
  await waitFor(() => {
    expect(
      screen.getByText("Enter your email and password to create an account!")
    );
  });

  // Email field blank
  fireEvent.change(screen.getByTestId(/signup-email/), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(screen.getByText("Enter your email."));
  });

  // Email without a domain
  fireEvent.change(screen.getByTestId(/signup-email/), {
    target: { value: "GRANDMASGMAIL" },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(screen.getByText("That's not a valid email."));
  });

  // Email without an address
  fireEvent.change(screen.getByTestId(/signup-email/), {
    target: { value: "@yahoo.com" },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(screen.getByText("That's not a valid email."));
  });

  // Email correct, password blank
  fireEvent.change(screen.getByTestId(/signup-email/), {
    target: { value: mockUser.email },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(screen.getByText("Enter your password."));
  });

  // Password and confirmation are different
  fireEvent.change(screen.getByTestId(/signup-password/), {
    target: { value: mockUser.password },
  });
  fireEvent.change(screen.getByTestId(/signup-confirmation/), {
    target: { value: "dang123" },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(
      screen.getByText(
        "Your password isn't the same as your confirmation. Try again!"
      )
    );
  });

  // Password is too short (< 6 characters)
  const shortPassword = "xyz2";
  fireEvent.change(screen.getByTestId(/signup-password/), {
    target: { value: shortPassword },
  });
  fireEvent.change(screen.getByTestId(/signup-confirmation/), {
    target: { value: shortPassword },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(
      screen.getByText("Your password must be between 6 and 128 characters.")
    );
  });

  // Password is too long (> 128 characters)
  const longPassword = `${"too dang long".repeat(20)}`;
  fireEvent.change(screen.getByTestId(/signup-password/), {
    target: { value: longPassword },
  });
  fireEvent.change(screen.getByTestId(/signup-confirmation/), {
    target: { value: longPassword },
  });
  fireEvent.click(screen.getByText("Sign me up!"));
  await waitFor(() => {
    expect(
      screen.getByText("Your password must be between 6 and 128 characters.")
    );
  });
});

test("A user can't sign in with invalid info", async () => {
  fireEvent.click(screen.getByText("Log In"));
  await waitFor(() => {
    expect(screen.getByText("sign in to your account to continue!"));
  });

  // Email field blank
  fireEvent.change(screen.getByTestId(/login-email/), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(screen.getByText("Enter your email."));
  });

  // Invalid email formats
  fireEvent.change(screen.getByTestId(/login-email/), {
    target: { value: "SUPEREMAIL" },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(screen.getByText("That's not a valid email."));
  });
  fireEvent.change(screen.getByTestId(/login-email/), {
    target: { value: "@GRANDMA.NET" },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(screen.getByText("That's not a valid email."));
  });

  // Password field blank
  fireEvent.change(screen.getByTestId(/login-email/), {
    target: { value: "legit@email.com" },
  });
  fireEvent.change(screen.getByTestId(/login-password/), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(screen.getByText("Enter your password."));
  });

  // Password is too short (< 6 characters)
  fireEvent.change(screen.getByTestId(/login-password/), {
    target: { value: "xyz2" },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(
      screen.getByText(
        "That's not a valid password! Passwords should be betweeen 6 and 128 characters."
      )
    );
  });

  // Password is too long (> 128 characters)
  const longPassword = `${"too dang long".repeat(20)}`;
  fireEvent.change(screen.getByTestId(/login-password/), {
    target: { value: longPassword },
  });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(
      screen.getByText(
        "That's not a valid password! Passwords should be betweeen 6 and 128 characters."
      )
    );
  });
});

test("A confirmed user can sign in", async () => {
  await waitFor(() => {
    expect(screen.getByText("sign in to your account to continue!"));
  });
  fireEvent.change(screen.getByTestId(/login-email/), {
    target: { value: "TruckDude@yahoo.com" },
  });
  fireEvent.change(screen.getByTestId(/login-password/), {
    target: { value: "trucksareAMAZING" },
  });
  mock
    .onPost("/users/sign_in")
    .reply(201, {}, { Authorization: `fakeToken12345` });
  fireEvent.click(screen.getByText("Sign In"));
  await waitFor(() => {
    expect(screen.getByText("Dashboard"));
  });
});

// Email confirmations and password resets are tested in /test/integration/authentication_test.rb
