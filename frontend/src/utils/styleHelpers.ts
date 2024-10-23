import { TimeStatus } from "../interfaces/time.interface"

export const getTextColorFromStatus = (status: TimeStatus) => {
  switch (status) {
    case "approved":
      return "success"
    case "denied":
      return "error"
    case "pending":
      return "warning"
    case "draft":
      return "textDisabled"
    default:
      return "textDisabled"
  }
}
