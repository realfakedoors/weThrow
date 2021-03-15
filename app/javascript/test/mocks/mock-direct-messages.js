import { rest } from "msw";
import { setupServer } from "msw/node";

const sign = require("jwt-encode");
const secret = "secret";
const userData = {
  iat: Date.now(),
  exp: Date.now() + 10000000,
  sub: 1,
  name: "Rocko",
  username: "rocko1",
  admin: false,
};
const adminData = {
  iat: Date.now(),
  exp: Date.now() + 10000000,
  sub: 2,
  name: "Dr. Hutchison",
  username: "hutch1",
  admin: true,
};
const userJWT = sign(userData, secret);
const adminJWT = sign(adminData, secret);

const dmData = {
  direct_messages: [
    {
      id: 1,
      category: "private",
      sender_id: 2,
      recipient_id: 1,
      subject: "Hey Hef!",
      created_at: "2021-03-01T03:09:21.446Z",
      updated_at: "2021-03-01T03:09:21.446Z",
      messages: [
        {
          id: 1,
          content: "I can write to you now!",
          author_id: 2,
          messageable_type: "DirectMessage",
          messageable_id: 1,
          created_at: "2021-03-02T22:18:06.336Z",
          updated_at: "2021-03-02T22:18:06.336Z",
          read_by: [],
        },
      ],
    },
  ],
  unread_count: 0,
  partners: [
    {
      "1": {
        name: "Heffer",
        profile_pic: "default_user.svg",
      },
    },
  ],
};

const msgData = {
  id: 2,
  content: "you're cool.",
  author_id: 1,
  messageable_type: "DirectMessage",
  messageable_id: 1,
  created_at: "2021-03-02T22:18:06.336Z",
  updated_at: "2021-03-02T22:18:06.336Z",
  read_by: [],
};

export const server = setupServer(
  rest.post("/users/sign_in", (req, res, ctx) => {
    const email = req.body.user.email;
    if (email === "admin@weThrow.com") {
      return res(ctx.set("Authorization", adminJWT));
    } else {
      return res(ctx.set("Authorization", userJWT));
    }
  }),

  rest.get("/direct_messages", (req, res, ctx) => {
    return res(ctx.json(dmData));
  }),

  rest.post("/messages", (req, res, ctx) => {
    return res(ctx.json(msgData));
  }),

  rest.get("/messages/:id", (req, res, ctx) => {
    return res(ctx.json(msgData));
  }),

  rest.patch("/messages/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.delete("/users/sign_out", (req, res, ctx) => {
    return res(ctx.json({}));
  })
);
