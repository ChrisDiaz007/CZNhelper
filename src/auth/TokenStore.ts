import Cookies from "universal-cookie";

const cookies = new Cookies();

const TokenStore = {
  // Get token
  getToken: (): string | null => {
    return cookies.get("token") || null;
  },

  // Set token
  setToken: (token: string) => {
    cookies.set("token", token, { path: "/" });
  },

  // Remove token
  removeToken: () => {
    cookies.remove("token", { path: "/" });
  },
};

export default TokenStore;
