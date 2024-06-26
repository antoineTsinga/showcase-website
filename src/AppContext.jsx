import React, { createContext, useContext, useState, useEffect } from "react";

import { backend } from "./adapters/apiCalls";

import checkUser from "./adapters/checkUser";

export const AppContext = createContext({
  onConnect: null, // true, false, or null if not set
  setOnConnect: Function,
  name: null,
  email: null,
  id: null,
  user: {},
  cart: {},
  updateUser: Function,
  updateCart: Function,
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [onConnect, setOnConnect] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (onConnect === false) {
        return;
      }

      const response = await checkUser();
      if (response.data?.id) {
        setUsername(response.data.username);
        setUserData(response.data);
        const { data: user1 } = await backend.get(`users/${response.data.id}`);

        setIsAdmin(response.data["Authorities"][0].authority === "ROLE_ADMIN");

        if (!response.data["Authorities"][0].authority === "ROLE_ADMIN") {
          const { data: cart } = await backend.get(`carts/${user1.cart.id}`);

          setCart(cart);
        }

        await setUser(user1);
      } else {
        clear();
      }
      setOnConnect(false);
    }
    fetchData();
  }, [onConnect]); // Or [] if effect doesn't need props or state

  function clear() {
    setUser({});
    setCart({});
    setUserData({});
    setUsername(null);
    setIsAdmin(false);
  }
  return (
    <AppContext.Provider
      value={{
        username,
        onConnect,

        isAdmin,
        setOnConnect,
        userData,
        user,
        cart,
        updateCart: setCart,
        updateUser: setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
