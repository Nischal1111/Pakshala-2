import Cookies from "js-cookie";

export const userLogged = () => {
  const cookie = Cookies.get("accessToken");
  return cookie
};
