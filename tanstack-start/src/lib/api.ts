import axios from "redaxios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type ProblemDetails = {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  traceId?: string;
};

export function getApiErrorMessage(error: unknown) {
  const response = error as {
    data?: ProblemDetails;
    statusText?: string;
  };

  return response.data?.detail ?? response.statusText ?? "Unexpected error";
}
