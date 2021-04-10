/* eslint-disable */
import { rest } from "msw";
import { setupServer } from "msw/node";

import { userData, adminData, dmData, msgData, courseData } from "./data";

const sign = require("jwt-encode");
const secret = "secret";
const userJWT = sign(userData, secret);
const adminJWT = sign(adminData, secret);

export const server = setupServer(
  rest.post("/users/sign_in", (req, res, ctx) => {
    const email = req.body.user.email;
    if (email === "admin@weThrow.com") {
      return res(ctx.set("Authorization", adminJWT));
    } else {
      return res(ctx.set("Authorization", userJWT));
    }
  }),

  rest.get("/api/direct_messages", (req, res, ctx) => {
    return res(ctx.json(dmData));
  }),

  rest.post("/api/messages", (req, res, ctx) => {
    return res(ctx.json(msgData));
  }),

  rest.get("/api/messages/:id", (req, res, ctx) => {
    return res(ctx.json(msgData));
  }),

  rest.patch("/api/messages/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.delete("/users/sign_out", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  // Mocked so we can view the My Courses table in the dashboard.
  rest.get("/api/my_courses", (req, res, ctx) => {
    return res(ctx.json([courseData]));
  })
);
