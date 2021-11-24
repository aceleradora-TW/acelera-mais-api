export const handleError = (error, request, response, next) =>
  response.status(400).json({ message: error.message })

