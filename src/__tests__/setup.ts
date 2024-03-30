import "@testing-library/jest-dom";
import type { NextApiHandler, NextPage } from "next";

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

jest.mock("@auth0/nextjs-auth0", () => {
  return {
    getSession: () => ({
      user: {
        sub: "bob",
      },
    }),
    getAccessToken: () => "access_token",
    withApiAuthRequired: (handler: NextApiHandler) => handler,
    withPageAuthRequired: (page: () => NextPage) => () => page(),
  };
});
