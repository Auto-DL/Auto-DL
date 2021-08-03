import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(

  rest.post("/auth/login/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Login Successful",
        user: req.body.username,
        token: "234232342352342545234",
      })
    );
  }),

  rest.post("/auth/register/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Registration Successful",
        username: req.body.username,
        token: "234232342352342545234",
      })
    );
  })
);

export { server, rest };
