export const createProcess = (request, response) => {
  const hiringProcess = {
    name: request.body.name,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    description: request.body.description
  }

  return response.status(201).json({ message: 'hello world!', hiringProcess })
}
