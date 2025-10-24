import React from "react";

export type APILoadingResponse = {
  isLoading: true;
};

export type APISuccessResponse<T> = {
  isLoading: false;
  data: T;
};

export type APIResponse<T> = APILoadingResponse | APISuccessResponse<T>;

const useFakeGETApi = <T>(data: T): APIResponse<T> => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return {
      isLoading: true,
    };
  }

  return {
    isLoading: false,
    data,
  };
};

export default useFakeGETApi;
