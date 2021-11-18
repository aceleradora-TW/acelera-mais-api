export const itsWorks = (request, response) => {
  return response.json({ message: "it's works! TYPEORM_HOST: " + process.env.TYPEORM_HOST })
}
