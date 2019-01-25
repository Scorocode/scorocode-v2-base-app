
export const datetimeUtc = () => {
  return new Date(new Date().toUTCString())
}
