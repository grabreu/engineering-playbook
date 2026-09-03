import ky, { isHTTPError } from "ky";
import { env } from "~/config/env";
import type { ProblemDetails } from "~/types/api";

export const api = ky.create({
  baseUrl: env.VITE_API_URL,
  hooks: {
    beforeError: [
      ({ error }) => {
        if (isHTTPError(error)) {
          const problem = error.data as ProblemDetails;
          return new Error(problem.detail ?? problem.title ?? error.message);
        }
        return new Error("Something went wrong. Please try again later.");
      },
    ],
  },
});
