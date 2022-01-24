import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import axios from "axios";

const baseurl = process.env.NODE_ENV === "production" ? "/api" : "";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || baseurl;

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, {
    providers: [
      GoogleProvider({
        async profile(profile) {
          const secret = process.env.JWT_SECRET;
          const payload = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            email_verified: true,
            first_name: profile.given_name,
            last_name: profile.family_name,
            image: profile.picture,
          };
          var token = jwt.sign(payload, secret);
          console.log(payload);
          try {
            const response = await axios.post(
              `${BACKEND_API_URL}/auth/oauth/verify/`,
              {
                token: token,
              }
            );
            // return response.data.token ? response.data.token : "Malicious JWT token";
            return payload;
          } catch (error) {
            console.log(error);
            return {
              message: "Server error! Please try again later in some time",
            };
          }
        },
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GithubProvider({
        async profile(profile) {
          const secret = process.env.JWT_SECRET;
          const payload = {
            id: profile.id,
            name: profile.login,
            email: profile.email,
            email_verified: true,
            first_name: profile.name,
            last_name: "",
            image: profile.avatar_url,
          };
          var token = jwt.sign(payload, secret);
          console.log(payload);
          try {
            const response = await axios.post(
              `${BACKEND_API_URL}/auth/oauth/verify/`,
              {
                token: token,
              }
            );
            // return response.data.token ? response.data.token : "Malicious JWT token";
            return payload;
          } catch (error) {
            console.log(error);
            return {
              message: "Server error! Please try again later in some time",
            };
          }
        },
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    secret: process.env.JWT_SECRET,
    cookies: {
      sessionToken: {
        name: `token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
        },
      },
    },
  });
