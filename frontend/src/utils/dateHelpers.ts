export const formatDateIntoString = (date: number) => {
  if (Date.now() - date < 86400000) return "Today"
  if (Date.now() - date < 86400000 * 2) return "Yesterday"

  return new Date(date).toDateString()
}
