
import {rest} from 'msw'
import {setupServer} from 'msw/node'


const server = setupServer(
    rest.post("/auth/login/", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ 
        message : "Login Successful",
        user: "username",
        token : "234232342352342545234"}))
    }),
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export {server,rest}