
import React, { createContext, useMemo, useState } from "react";
import { IChildren } from "../../types/system";
import { IUserAttributes } from "../../types/model/user.interface";
import { Session } from "../../types/response/user.interface";


interface IAuthContext {
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  session: Session | undefined
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface IProvider extends IChildren {
}

export const AuthProvider: React.FC<IProvider> = ({ children, }) => {
  const [session, setSession] = useState<Session>()
  const contextValue = useMemo(() => ({
    setSession,
    session,
  }), [session])
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
