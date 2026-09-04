import ky, { isHTTPError } from "ky";

export const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeError: [
      ({ error }) => {
        if (isHTTPError(error)) {
          const problem = error.data as { detail?: string; title?: string };
          return new Error(problem.detail ?? problem.title ?? error.message);
        }
        return new Error("Something went wrong. Please try again later.");
      },
    ],
  },
});
