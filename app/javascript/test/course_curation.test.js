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
import useProvideAuth, { ProvideAuth, authContext } from "../hooks/use-auth";

import App from "../components/App";

describe("Disc Golf Courses", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup;
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("A signed-in user can create, update and delete courses", async () => {
    const { getByText } = render(
      <ProvideAuth>
        <authContext.Provider value={useProvideAuth}>
          <App />
        </authContext.Provider>
      </ProvideAuth>
    );

    // When a user logs into their account, they have access to a New Course button in their dashboard.
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
    });
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(screen.getByText("Thanks for adding a course to weThrow!"));
    });
    fireEvent.click(getByText("Let's do it!"));
    await waitFor(() => {
      expect(screen.getByText("Add a Course"));
    });

    // Filling out the New Course Form improperly causes failing validations.
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(
        screen.getByText("Course Name should be longer than 6 characters!")
      );
    });

    const superLongName = "Long Long Name".repeat(10);
    fireEvent.change(screen.getByTestId(/course-name/), {
      target: { value: superLongName },
    });
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(
        screen.getByText("Course Name can't be longer than 75 characters!")
      );
    });

    fireEvent.change(screen.getByTestId(/course-name/), {
      target: { value: "Skeleton Peak" },
    });
    const superLongDescription = "Long Long Description".repeat(50);
    fireEvent.change(screen.getByTestId(/description/), {
      target: { value: superLongDescription },
    });
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(
        screen.getByText("Description can't be longer than 600 characters.")
      );
    });

    fireEvent.change(screen.getByTestId(/description/), {
      target: {
        value:
          "This course is insane. Don't play it unless you're cool with near-death experiences.",
      },
    });
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(screen.getByText("Enter a city, town, locality or area."));
    });
    fireEvent.change(screen.getByTestId(/city/), {
      target: { value: "Tanzania" },
    });

    // Successfully filling out all the required fields, our user creates a course.
    fireEvent.change(screen.getByTestId(/course-designer/), {
      target: {
        value: "Volcanic Activity",
      },
    });
    fireEvent.change(screen.getByTestId(/baskets/), {
      target: {
        value: "Tanzanian Disc Grabbers",
      },
    });
    fireEvent.change(screen.getByTestId(/street-address/), {
      target: {
        value: "1215 Kilimanjaro Lane",
      },
    });
    fireEvent.change(screen.getByTestId(/zip/), {
      target: {
        value: "80211",
      },
    });

    fireEvent.change(screen.getByTestId(/new-layout-name/), {
      target: {
        value: "Buzzard's Perch",
      },
    });
    fireEvent.change(screen.getByTestId(/number-of-holes/), {
      target: {
        value: 3,
      },
    });

    fireEvent.click(getByText("Add Layout"));
    await waitFor(() => {
      expect(screen.getByText("Buzzard's Perch"));
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-0-par/), {
      target: {
        value: 3,
      },
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-1-par/), {
      target: {
        value: 4,
      },
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-2-par/), {
      target: {
        value: 5,
      },
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-0-distance/), {
      target: {
        value: 305,
      },
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-1-distance/), {
      target: {
        value: 480,
      },
    });
    fireEvent.change(screen.getByTestId(/Buzzard's Perch-0-2-distance/), {
      target: {
        value: 721,
      },
    });
    fireEvent.click(getByText("Create Course"));
    await waitFor(() => {
      expect(screen.getByText("Skeleton Peak"));
      expect(
        screen.getByText(
          "This course is insane. Don't play it unless you're cool with near-death experiences."
        )
      );
      expect(screen.getByText("1215 Kilimanjaro Lane"));
      expect(screen.getByText("Tanzanian Disc Grabbers"));
      expect(screen.getByText("Year-Round"));
      expect(screen.getByText("Buzzard's Perch"));
    });

    // Users can leave course reviews.
    fireEvent.change(
      screen.getByPlaceholderText("What did you think of Skeleton Peak?"),
      {
        target: {
          value: "Pretty neat course! Watch out for buzzards!",
        },
      }
    );
    fireEvent.change(screen.getByTestId(/rating-slider/), {
      target: { value: 7 },
    });
    fireEvent.click(getByText("Weigh In"));
    await waitFor(() => {
      expect(screen.getByText("Pretty neat course! Watch out for buzzards!"));
      expect(screen.getByText("7.0"));
      expect(screen.getByText("Amazing"));
      expect(screen.getByText("2 Ratings"));
    });
    // If the current user already left a review for the course, disable the review form.
    await waitFor(() => {
      expect(screen.queryByText("Leave a Review:")).toBeNull();
      expect(
        screen.queryByPlaceholderText("What did you think of Skeleton Peak?")
      ).toBeNull();
    });
    // If they change their mind, they can delete their review and leave another one.
    fireEvent.click(screen.getByTestId(/delete-review/));
    await waitFor(() => {
      expect(screen.getByText("1 Rating"));
      expect(screen.getByText("Leave a Review:"));
    });

    // Our curator can edit their course.
    fireEvent.click(getByText("Edit Course"));
    await waitFor(() => {
      expect(screen.getByText("Edit Skeleton Peak"));
    });
    fireEvent.click(getByText("Update Skeleton Peak"));
    await waitFor(() => {
      expect(
        screen.getByText(
          "This course is insane. Don't play it unless you're cool with near-death experiences."
        )
      );
    });

    // Curators can view their courses in their dashboard.
    fireEvent.click(getByText("Rocko"));
    await waitFor(() => {
      expect(screen.getByText("Dashboard"));
      expect(screen.getByText("Skeleton Peak"));
      expect(screen.getByText("Tanzania, CO"));
      expect(screen.getByText("Sketchy"));
    });

    // Curators can delete their courses.
    fireEvent.click(getByText("Skeleton Peak"));
    await waitFor(() => {
      expect(
        screen.getByText(
          "This course is insane. Don't play it unless you're cool with near-death experiences."
        )
      );
    });
    fireEvent.click(getByText("Edit Course"));
    await waitFor(() => {
      expect(screen.getByText("Delete Skeleton Peak"));
    });
    await act(async () => {
      fireEvent.click(getByText("Delete Skeleton Peak"));
    });
    await waitFor(() => {
      expect(screen.getByText("Rocko"));
      expect(screen.queryByText("Skeleton Peak")).toBe(null);
    });
  });
});

// Our Course API is tested in /test/integration/course_test.rb
