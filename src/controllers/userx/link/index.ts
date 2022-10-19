import JWT from "jsonwebtoken"

export const createLink = () => {
  const dateLink = JWT.sign({ date: new Date().valueOf() })
  console.log(dateLink)
  return { url: "/user/" + dateLink }
}
