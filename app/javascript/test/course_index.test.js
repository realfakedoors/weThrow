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

import { server } from "./mocks/mock-courses";

import App from "../components/App";

describe("Disc Golf Course index and search", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup;
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("Users can view an index of all courses, or search for courses", async () => {
    const { getByText } = render(<App />);

    // Clicking the 'Courses' link in the navbar takes us to an index of all courses.
    fireEvent.click(getByText("All Courses"));
    await waitFor(() => {
      expect(screen.getByText("Skeleton Peak"));
      expect(screen.getByText("Tanzania, CO"));
      expect(screen.getByText("Sketchy"));
    });

    // Searching for courses returns a list of results.
    fireEvent.change(screen.getByTestId(/search-courses/), {
      target: { value: "Skeleton Peak" },
    });
    fireEvent.click(getByText("Search"));
    await waitFor(() => {
      expect(screen.getByText("1 result found for 'Skeleton Peak'"));
      expect(screen.getByText("Skeleton Peak"));
      expect(screen.getByText("Tanzania, CO"));
      expect(screen.getByText("Sketchy"));
    });
  });
});

// Our Course API is tested in /test/integration/course_test.rb
