import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactElement, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: null | any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [user, setUser] = useState<null | any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.toJSON());
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
