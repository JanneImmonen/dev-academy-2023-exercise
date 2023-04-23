// src/utils/errorHandling.ts
import { AxiosError } from "axios";

export function handleError(error: AxiosError): string {
  let errorMessage = "An error occurred";

  if (error.response) {
    errorMessage =
      (error.response.data as { message?: string }).message ||
      error.response.statusText;
  } else if (error.request) {
    errorMessage = "No response received from the server";
  } else {
    errorMessage = error.message;
  }

  return errorMessage;
}
