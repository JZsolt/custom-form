import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem("jwt");
    return token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("jwt", userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};
