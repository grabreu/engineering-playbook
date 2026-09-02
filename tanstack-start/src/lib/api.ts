import ky, { isHTTPError } from "ky";
import { env } from "~/config/env";

type ProblemDetails = {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  traceId?: string;
};

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
