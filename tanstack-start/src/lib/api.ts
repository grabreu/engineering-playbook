import aduana from "@grabreu/aduana";
import { env } from "~/config/env";

export const api = aduana.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.response.use(undefined, (error) => {
  if (aduana.isHttpError(error)) {
    throw new Error(error.problem?.detail ?? error.problem?.title ?? "Something went wrong. Please try again later.");
  }
  throw error;
});
