export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface Response<T> extends BaseResponse<T> {}
