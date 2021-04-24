/* eslint-disable */
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  userData,
  adminData,
  dmData,
  friendshipData,
  courseData,
  myRoundData,
} from "./data";

const sign = require("jwt-encode");
const userJWT = sign(userData, "secret");

export const server = setupServer(
  rest.post("/users/sign_in", (req, res, ctx) => {
    return res(ctx.set("Authorization", userJWT));
  }),

  rest.get("/api/direct_messages", (req, res, ctx) => {
    return res(ctx.json(dmData));
  }),

  rest.get("/api/search_users", (req, res, ctx) => {
    return res(ctx.json(adminData));
  }),

  rest.delete("/api/friendships/:id", (req, res, ctx) => {
    return res(ctx.json({}));
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
