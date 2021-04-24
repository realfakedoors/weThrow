/* eslint-disable */
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  userData,
  courseData,
  dmData,
  reviewData,
  friendshipData,
  myRoundData,
} from "./data";

const sign = require("jwt-encode");
const userJWT = sign(userData, "secret");

export const server = setupServer(
  rest.post("/users/sign_in", (req, res, ctx) => {
    return res(ctx.set("Authorization", userJWT));
  }),

  rest.get("/api/my_courses", (req, res, ctx) => {
    return res(ctx.json([courseData.course]));
  }),

  rest.get("/api/courses", (req, res, ctx) => {
    return res(ctx.json([courseData.course]));
  }),

  rest.get("/api/search_courses", (req, res, ctx) => {
    return res(ctx.json(courseData.course));
  }),

  rest.get("/api/courses/:id", (req, res, ctx) => {
    return res(ctx.json(courseData));
  }),

  rest.get("/api/rounds", (req, res, ctx) => {
    return res(ctx.json(myRoundData));
  }),

  rest.post("/api/courses", (req, res, ctx) => {
    return res(ctx.json(courseData));
  }),

  rest.patch("/api/courses/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.delete("/api/courses/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.post("/api/reviews", (req, res, ctx) => {
    courseData.course.reviews.push(reviewData);
    return res(ctx.json(courseData));
  }),

  rest.delete("/api/reviews/:id", (req, res, ctx) => {
    courseData.course.reviews.pop(reviewData);
    return res(ctx.json(courseData));
  }),

  // Mocked here so our inbox button renders in our navbar with an 'unread messages' count.
  rest.get("/api/direct_messages", (req, res, ctx) => {
    return res(ctx.json(dmData));
  }),

  // Mocked so we can view the My Courses, Friendships and My Rounds tables in the dashboard.
  rest.get("/api/my_courses", (req, res, ctx) => {
    return res(ctx.json([courseData.course]));
  }),

  rest.get("/api/rounds", (req, res, ctx) => {
    return res(ctx.json(myRoundData));
  }),

  rest.get("/api/friendships", (req, res, ctx) => {
    return res(ctx.json(friendshipData));
  })
);
