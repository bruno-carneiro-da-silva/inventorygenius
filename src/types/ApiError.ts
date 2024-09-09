export type ApiError = {
  response?: {
    data?: {
      succeeded: boolean;
      errors: Array<{
        key: string;
        message: string;
      }>;
      data: any;
    };
  };
};
