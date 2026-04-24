import { createContext } from "react";

export const AuthContext = createContext<(token: string) => void>((_token) => {});
