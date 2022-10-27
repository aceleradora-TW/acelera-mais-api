export const convertDate = (date: Date) => {
  return `${Math.round(
    (Date.now() - 10800000 - Number(date)) / 86400000
  )} dias atrás`
}
