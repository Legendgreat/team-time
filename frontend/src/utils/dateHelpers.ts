export const formatDateIntoString = (date: Date) => {
  if (Date.now() - date.getTime() < 86400000) return "Today"
  if (Date.now() - date.getTime() < 86400000 * 2) return "Yesterday"

  return date.toDateString()
}
