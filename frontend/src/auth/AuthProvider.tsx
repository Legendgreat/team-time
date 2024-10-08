import React, { useCallback, useEffect, useState } from "react"
import authApi from "../api/authApi"
import { AuthReturn } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface"
import { AuthContext } from "./AuthContext"
import { useRouter } from "@tanstack/react-router"
import { flushSync } from "react-dom"

export interface IAuthContext {
  isAuthenticated: boolean
  login: (userData: Partial<User>) => Promise<void>
  logout: () => Promise<void>
  token: string | null
  user: User | null
}

const tokenKey = "access_token"
const userKey = "user"

const getLocalData = (key: string) => {
  return localStorage.getItem(key) || null
}

const setStoredToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(tokenKey, token)
  } else {
    localStorage.removeItem(tokenKey)
  }
}

const setStoredUser = (user: string | null) => {
  if (user) {
    localStorage.setItem(userKey, user)
  } else {
    localStorage.removeItem(userKey)
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(getLocalData(tokenKey))
  const [user, setUser] = useState<User | null>(
    getLocalData(userKey) ? JSON.parse(getLocalData(userKey)!) : null
  )
  const isAuthenticated = !!token

  const setAll = (data: AuthReturn | null) => {
    if (data) {
      const { access_token, user } = data
      setStoredToken(access_token)
      setStoredUser(user)
      setToken(access_token)
      setUser(JSON.parse(user))
    } else {
      setStoredToken(null)
      setStoredUser(null)
      setToken(null)
      setUser(null)
    }
  }

  const logout = useCallback(async () => {
    flushSync(() => {
      setAll(null)
    })
  }, [])

  const login = useCallback(async (userData: Partial<User>) => {
    const data = await authApi.login(userData)
    flushSync(() => {
      setAll(data)
    })
  }, [])

  useEffect(() => {
    setToken(getLocalData(tokenKey))
    setUser(JSON.parse(getLocalData(userKey)!))
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
