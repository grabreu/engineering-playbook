import aduana from "@grabreu/aduana";

export const api = aduana.create({
  baseURL: process.env.API_URL,
});

api.interceptors.response.use(undefined, (error) => {
  if (aduana.isHttpError(error)) {
    throw new Error(
      error.problem?.detail ??
        error.problem?.title ??
        "Something went wrong. Please try again later.",
    );
  }
  throw error;
});
