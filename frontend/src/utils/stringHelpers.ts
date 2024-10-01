import { TimeStatus } from "../types/Time"

export const formatStatusIntoText = (status: TimeStatus) => {
  switch (status) {
    case "draft":
      return "Draft"
    case "pending":
      return "Pending"
    case "approved":
      return "Approved"
    case "denied":
      return "Denied"
    default:
      return "Invalid Status"
  }
}
