import Cookies from "js-cookie";

export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  const refresh = Cookies.get("refreshToken");
  const access = Cookies.get("accessToken");

  if (refresh && access) {
    return access;
  }
  return false;
};
