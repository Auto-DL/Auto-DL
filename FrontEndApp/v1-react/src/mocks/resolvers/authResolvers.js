export const getLoginResolver = (req, res, ctx) => {
  let user = req.body.username;
  let message = "Login Successful";
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  return res(
    ctx.status(status),
    ctx.json({
      message: message,
      user: user,
      token: token,
    })
  );
};

export const getRegistrationResolver = (req, res, ctx) => {
  let user = req.body.username;
  let message = "Registration Successful";
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  return res(
    ctx.status(status),
    ctx.json({
      message: message,
      username: user,
      token: token,
    })
  );
};
