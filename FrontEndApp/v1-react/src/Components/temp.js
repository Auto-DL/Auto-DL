import { createOAuthAppAuth } from "@octokit/auth-oauth-app";

const appOctokit = new Octokit({
    authStrategy: createOAuthAppAuth,
    auth: {
        clientId: "cf38877318e6d0fb3c51",
        clientSecret: "fe4a30a8712d3621ad02799e739ef913d660cc53",
    },
});

// Send requests as app
await appOctokit.request("POST /application/{client_id}/token", {
    client_id: "1234567890abcdef1234",
    access_token: "existingtoken123",
});
console.log("token is valid");

// create a new octokit instance that is authenticated as the user
const userOctokit = await appOctokit.auth({
    type: "oauth-user",
    code: "code123",
    factory: (options) => {
        return new Octokit({
            authStrategy: createOAuthUserAuth,
            auth: options,
        });
    },
});

// Exchanges the code for the user access token authentication on first request
// and caches the authentication for successive requests
const {
    data: { login },
} = await userOctokit.request("GET /user");
console.log("Hello, %s!", login);