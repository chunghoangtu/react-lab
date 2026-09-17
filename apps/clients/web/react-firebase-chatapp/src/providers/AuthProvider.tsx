import { createContext, useEffect, useState, type PropsWithChildren } from "react";

import { onAuthChange, signOutUser } from "@/services/auth.service";
import { Spin } from "antd";

type AuthContextProps = {
  user: ChatUser;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: {},
  isLoading: true,
  signOut: async () => {},
});

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ChatUser>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((userCredential) => {
      if (userCredential) {
        const { displayName, email, uid, photoURL } = userCredential;
        setUser({
          displayName: displayName ?? undefined,
          email: email ?? undefined,
          uid,
          photoURL: photoURL ?? undefined,
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut: signOutUser }}>
      {isLoading ? <Spin style={{ position: "fixed", inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
