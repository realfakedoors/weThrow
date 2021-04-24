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

import { server } from "./mocks/mock-rounds";
import useProvideAuth, { ProvideAuth, authContext } from "../hooks/use-auth";

import App from "../components/App";

describe("Rounds", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup;
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("A user can start a round with their friends, play it out, and submit it to the course.", async () => {
    const onSubmit = jest.fn((e) => e.preventDefault);
    const { getByText } = render(
      <ProvideAuth>
        <authContext.Provider value={useProvideAuth}>
          <App />
        </authContext.Provider>
      </ProvideAuth>
    );

    // Log in to User Dashboard.
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
      expect(screen.getByText("My Rounds"));
    });

    // Add a friend to the card.
    fireEvent.click(getByText("Start a new round"));
    await waitFor(() => {
      expect(screen.getByText("Select Friends"));
      expect(screen.getByText("Current Card"));
      expect(screen.getByText("Amazing Guy"));
      expect(screen.getByTestId(/add 4/));
    });
    fireEvent.click(screen.getByTestId(/add 4/));

    // Remove players from the card, then change your mind and add them back anyway.
    await waitFor(() => {
      expect(screen.getByTestId(/remove 4/));
    });
    fireEvent.click(screen.getByTestId(/remove 4/));
    await waitFor(() => {
      expect(screen.getByTestId(/add 4/));
    });
    fireEvent.click(screen.getByTestId(/add 4/));

    // Course & Hole Layout selection
    fireEvent.click(getByText("Choose A Course..."));
    await waitFor(() => {
      expect(screen.getByText("Pick A Course"));
      expect(screen.getByPlaceholderText("Search for disc golf courses..."));
    });
    fireEvent.change(
      screen.getByPlaceholderText("Search for disc golf courses..."),
      {
        target: { value: "Skeleton" },
      }
    );
    fireEvent.click(screen.getByText("Search Courses"));
    await waitFor(() => {
      expect(screen.getByText("Skeleton Peak"));
      expect(screen.getByText("Select Course"));
    });
    fireEvent.click(screen.getByText("Select Course"));
    await waitFor(() => {
      expect(screen.getByText("Hole Layouts"));
      expect(screen.getByText("Buzzard's Perch"));
      expect(screen.getByText("Use This Layout"));
    });
    fireEvent.click(screen.getByText("Use This Layout"));
    await waitFor(() => {
      expect(screen.getByText("Start Your Round!"));
    });

    // Scoring the Round
    fireEvent.click(screen.getByText("Start Your Round!"));
    await waitFor(() => {
      expect(screen.getByText("Skeleton Peak"));
      expect(screen.getByText("Buzzard's Perch"));
      expect(screen.getByText("Amazing Guy"));
    });
    fireEvent.change(screen.getByTestId(/score-1-1/), {
      target: { value: 5 },
    });
    fireEvent.change(screen.getByTestId(/score-2-1/), {
      target: { value: 6 },
    });
    fireEvent.change(screen.getByTestId(/score-3-1/), {
      target: { value: 6 },
    });
    fireEvent.change(screen.getByTestId(/score-1-4/), {
      target: { value: 2 },
    });
    fireEvent.change(screen.getByTestId(/score-2-4/), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByTestId(/score-3-4/), {
      target: { value: 4 },
    });
    await waitFor(() => {
      expect(screen.getByText("+5"));
      expect(screen.getByText("-3"));
      expect(screen.getByText("Submit Rounds"));
    });

    // Submit or Discard Rounds
    fireEvent.click(screen.getByText("Submit Rounds"));
    await waitFor(() => {
      expect(screen.getByText("how'd you shoot out there? did you want to"));
      expect(screen.getByText("Save Your Round?"));
      expect(screen.queryAllByDisplayValue("save"));
    });
    fireEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("Success!"));
      expect(
        screen.getByText(
          "Your scores were posted to the course's page. You can also check them out in your Dashboard."
        )
      );
    });

    // After posting a round, it'll be up on the course's page (if it's in the top 10).
    fireEvent.click(screen.getByText("Back to Course"));
    await waitFor(() => {
      expect(screen.getByText("Hottest Rounds"));
      expect(screen.getByText("Amazing Guy"));
      expect(screen.getByText("-3"));
    });

    // Users can also track their rounds in their Dashboard.
    fireEvent.click(screen.getByTestId(/company-name/));
    fireEvent.click(getByText("Rocko"));
    await waitFor(() => {
      expect(screen.getByText("Dashboard"));
      expect(screen.getByText("My Rounds"));
      expect(screen.getByText("Buzzard's Perch"));
      expect(screen.getByText("+7"));
    });
  });
});
