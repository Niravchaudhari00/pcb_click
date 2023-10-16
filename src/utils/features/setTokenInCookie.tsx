import { useEffect, useState } from "react";
import Cookie from "js-cookie";

export const setAuthToken = (token: string) => {
  if (token !== undefined) {
    Cookie.set("token", token);
  }
};

const useToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return [authToken] as const;
};

export default useToken;
