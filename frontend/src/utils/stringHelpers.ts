import { TimeStatus } from "../interfaces/time.interface"

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

export const convertFullNameToLetters = (fullName: string) => {
  const names = fullName.split(" ")
  const letters = [names[0], names[names.length - 1]].map((name) =>
    name.substring(0, 1)
  )
  return letters.join("")
}
