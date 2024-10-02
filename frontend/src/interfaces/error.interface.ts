import { AxiosError } from "axios"

export interface FetchError {
  response: {
    status: number
    data: {
      message: string
    }
  }
}
