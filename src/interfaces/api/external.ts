export interface HttpResponseError {
  message: string;
  code: string;
}
export interface HttpResponse<T> {
  success: boolean;
  data?: T;
  error?: HttpResponseError;
}

export interface IAuthUserApiResponse {
  id: string;
  email: string;
  name: string;
}
