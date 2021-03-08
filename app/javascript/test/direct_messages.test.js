/* eslint-disable */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { server } from "./mocks/mock-direct-messages";
import useProvideAuth, { ProvideAuth, authContext } from "../hooks/use-auth";

import App from "../components/App";

describe("direct messages", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup;
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("A signed-in user can view and send messages", async () => {
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
      target: { value: "rocko1@o-town.com" },
    });
    fireEvent.change(screen.getByTestId(/login-password/), {
      target: { value: "spunky" },
    });
    fireEvent.click(getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Dashboard"));
      expect(screen.getByText("Inbox"));
    });

    fireEvent.click(getByText("Inbox"));
    await waitFor(() => {
      expect(screen.getByText("Messages"));
    });

    fireEvent.click(getByText("Heffer"));
    fireEvent.change(screen.getByTestId(/new-message/), {
      target: { value: "you're cool." },
    });
    fireEvent.click(getByText("Send"));
    await waitFor(() => {
      expect(screen.getByText("you're cool."));
    });

    fireEvent.click(getByText("Sign Out"));
    await waitFor(() => {
      expect(screen.getByText("sign in to your account to continue!"));
      expect(screen.queryByText("Inbox")).toBe(null);
    });
  });

  test("Admins get a special inbox for tickets and other feedback", async () => {
    const { getByText } = render(
      <ProvideAuth>
        <authContext.Provider value={useProvideAuth}>
          <App />
        </authContext.Provider>
      </ProvideAuth>
    );
    await waitFor(() => {
      expect(getByText("sign in to your account to continue!"));
    });

    fireEvent.change(screen.getByTestId(/login-email/), {
      target: { value: "admin@weThrow.com" },
    });
    fireEvent.change(screen.getByTestId(/login-password/), {
      target: { value: "iloverocko" },
    });
    fireEvent.click(getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Admin"));
    });

    fireEvent.click(getByText("Sign Out"));
    await waitFor(() => {
      expect(screen.getByText("sign in to your account to continue!"));
      expect(screen.queryByText("Inbox")).toBe(null);
    });
  });
});

// Our DirectMessage controller actions are tested in /test/integration/direct_message_test.rb
