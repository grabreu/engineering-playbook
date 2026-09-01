import ky, { isHTTPError } from "ky";

type ProblemDetails = {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  traceId?: string;
};

export const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeError: [
      ({ error }) => {
        if (isHTTPError(error)) {
          const problem = error.data as ProblemDetails;
          return new Error(problem.detail ?? error.message);
        }
        return error;
      },
    ],
  },
});
