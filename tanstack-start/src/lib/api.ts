import aduana from "@grabreu/aduana";
import { env } from "~/config/env";

export const api = aduana.create({
  baseURL: env.VITE_API_URL,
});
