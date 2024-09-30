const convertMinutesToHours = (duration: number) => {
  const minutes = duration % 60
  const hours = Math.floor(duration / 60)

  return { minutes, hours }
}

const leadSingleDigits = (num: number, qty: number): string => {
  if (num > 9) {
    return num.toString()
  }

  let leadingString = ""
  for (let i = 0; i < qty - 1; i++) {
    leadingString += "0"
  }

  return leadingString + num.toString()
}

export const formatMinuteDurationToString = (duration: number) => {
  if (duration > 0) {
    const { minutes, hours } = convertMinutesToHours(duration)

    let formatString: string = ""
    if (hours) formatString += `${hours}H`
    if (hours && minutes) formatString += " "
    if (minutes) formatString += `${minutes}M`

    return formatString
  }
  return "N/A"
}

export const formatMinuteDurationToHourDisplay = (duration: number) => {
  const { minutes, hours } = convertMinutesToHours(duration)
  const minuteString = leadSingleDigits(minutes, 2)

  let hourString: string | undefined
  let dayHalf = "am"

  if (hours > 12) {
    dayHalf = "pm"

    hourString = leadSingleDigits(hours - 12, 2)
  }

  if (!hourString) hourString = leadSingleDigits(hours, 2)

  return `${hourString}:${minuteString} ${dayHalf}`
}
