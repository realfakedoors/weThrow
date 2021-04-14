/* eslint-disable */
import { rest } from "msw";
import { setupServer } from "msw/node";

import { userData, courseData, dmData, reviewData } from "./data";

const sign = require("jwt-encode");
const userJWT = sign(userData, "secret");

export const server = setupServer(
  rest.post("/users/sign_in", (req, res, ctx) => {
    return res(ctx.set("Authorization", userJWT));
  }),

  rest.get("/api/my_courses", (req, res, ctx) => {
    return res(ctx.json([courseData]));
  }),

  rest.get("/api/courses", (req, res, ctx) => {
    return res(ctx.json([courseData]));
  }),

  rest.get("/api/search_courses", (req, res, ctx) => {
    return res(ctx.json(courseData));
  }),

  rest.get("/api/courses/:id", (req, res, ctx) => {
    return res(ctx.json(courseData));
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
    courseData.reviews.push(reviewData);
    return res(ctx.json(courseData));
  }),

  rest.delete("/api/reviews/:id", (req, res, ctx) => {
    courseData.reviews.pop(reviewData);
    return res(ctx.json(courseData));
  }),

  // Mocked here so our inbox button renders in our navbar with an 'unread messages' count.
  rest.get("/api/direct_messages", (req, res, ctx) => {
    return res(ctx.json(dmData));
  })
);
