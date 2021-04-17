/* eslint-disable */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";

import { server } from "./mocks/mock-friendships";
import useProvideAuth, { ProvideAuth, authContext } from "../hooks/use-auth";

import App from "../components/App";

describe("Friendships", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup;
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("A user can add new friends and interact with them.", async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <ProvideAuth>
        <authContext.Provider value={useProvideAuth}>
          <App />
        </authContext.Provider>
      </ProvideAuth>
    );

    fireEvent.click(getByText("Log In"));
    expect(getByText("sign in to your account to continue!"));

    fireEvent.change(screen.getByTestId(/login-email/), {
      target: { value: "rocko1@o-town.net" },
    });
    fireEvent.change(screen.getByTestId(/login-password/), {
      target: { value: "spunky" },
    });
    fireEvent.click(getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Dashboard"));
      expect(screen.getByText("New Friend Requests"));
      expect(screen.getByText("Sent Friend Requests"));
    });

    fireEvent.click(getByText("Add a Friend"));
    await waitFor(() => {
      expect(screen.getByText("Search for a weThrow username."));
    });

    fireEvent.click(getByText("Search for a weThrow username."));
    await waitFor(() => {
      expect(screen.getByText("Enter a weThrow username:"));
    });

    fireEvent.change(screen.getByTestId(/username/), {
      target: { value: "hutch1" },
    });
    fireEvent.submit(screen.getByTestId(/search-users/));
    await waitFor(() => {
      expect(screen.queryByText("hutch1"));
    });

    fireEvent.click(getByText("Check your dashboard for friend requests."));
    await waitFor(() => {
      expect(screen.getByText("Dashboard"));
      expect(screen.getByText("Add a Friend"));
    });

    fireEvent.click(getByText("Add a Friend"));
    await waitFor(() => {
      expect(screen.getByText("Show a friend your QR code."));
    });

    fireEvent.click(getByText("Show a friend your QR code."));
    await waitFor(() => {
      expect(screen.getByTestId(/qr-code/));
    });
  });
});

// Our Friendship API is tested in /test/integration/friendships_test.rb
