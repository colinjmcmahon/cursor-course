export const getMaskedKeyDisplay = (key) => {
  const firstDash = key.indexOf("-")
  const secondDash = firstDash === -1 ? -1 : key.indexOf("-", firstDash + 1)
  const cut = secondDash > 0 ? key.slice(0, secondDash + 1) : `${key.slice(0, 8)}-`
  return `${cut}${"*".repeat(20)}`
}
