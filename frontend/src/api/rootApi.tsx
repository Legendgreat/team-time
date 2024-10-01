import axios, { AxiosResponse } from "axios"

type Method = "get" | "post"

export const query = async <T,>(method: Method, url: string): Promise<T> => {
  const data = await axios({
    method,
    url,
  }).then((res: AxiosResponse<T>) => {
    return res.data
  })
  return data
}
