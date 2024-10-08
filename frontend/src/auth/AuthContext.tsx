import React from "react"
import { IAuthContext } from "./AuthProvider"

export const AuthContext = React.createContext<IAuthContext | undefined>(
  undefined
)
