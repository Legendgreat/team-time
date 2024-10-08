import axios, { AxiosResponse } from "axios"

type Method = "get" | "post" | "put" | "delete"

interface FetchItemOptions {
  method: Method
  body?: unknown
}

export const publicQuery = async <T,>(
  url: string,
  options: FetchItemOptions
): Promise<T> => {
  const { method, body } = options
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  return await axios({
    url,
    method,
    headers,
    data: body ?? undefined,
  }).then((res: AxiosResponse<T>) => {
    if (res.status > 299) {
      const { status, data } = res
      return Promise.reject({ status, data })
    }

    return res.data
  })
}

export const query = async <T,>(
  url: string,
  options: FetchItemOptions
): Promise<T> => {
  const { method, body } = options
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }

  return await axios({
    url,
    method,
    headers,
    data: body ?? undefined,
  }).then((res: AxiosResponse<T>) => {
    if (res.status > 299) {
      const { status, data } = res
      return Promise.reject({ status, data })
    }

    return res.data
  })
}
